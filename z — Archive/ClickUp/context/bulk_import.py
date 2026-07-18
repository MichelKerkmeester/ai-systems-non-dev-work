#!/usr/bin/env python3
"""Bulk import creators from CSV to ClickUp Creators list. Parallel execution."""

import csv
import json
import time
import sys
import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

API_TOKEN = os.environ.get("CLICKUP_API_KEY", "pk_224591351_3FLS0W4F1TIZ9UD7A1RN2Y38O6NOKTP2")
TEAM_ID = "90151466006"
LIST_ID = "901523087782"
CSV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Campaign Management [Full Service] - Creator Database (19_03_2026).csv")

WORKERS = int(os.environ.get("BULK_WORKERS", "10"))
RATE_LIMIT_DELAY = float(os.environ.get("BULK_DELAY", "0.01"))

COUNTRY_OPTIONS = {
    "Austria": "c8c4a037-831a-4028-9ef1-d8f894c5127a",
    "Belgium": "d4333ba5-6903-4a37-92cc-f5672b32fb25",
    "België": "d4333ba5-6903-4a37-92cc-f5672b32fb25",
    "Brazil": "f65a27fe-6a8c-4560-b780-eccb6169f6b2",
    "Denmark": "ec61a0b4-f3f2-419c-9f8b-36d4149c943c",
    "Finland": "a5f5dbe1-f7d1-4328-ab41-63a91881cbd1",
    "France": "6f537b60-3b59-4b19-9cf5-3fc0b626c7fa",
    "Germany": "82b7ba7b-f89f-4edf-a509-ebac8d909fe5",
    "Deutschland": "82b7ba7b-f89f-4edf-a509-ebac8d909fe5",
    "Greece": "3fad0df3-0c48-4df3-968d-dbc4d640f28b",
    "Italy": "9a83efdc-700b-4f1b-ac06-81171f65a4ae",
    "Luxembourg": "16ecb276-386f-4d6e-aaf6-313fcad3725b",
    "Netherlands": "b276b19b-fc2e-4b7a-8741-82210f088cbd",
    "Nederland": "b276b19b-fc2e-4b7a-8741-82210f088cbd",
    "Norway": "9c40b0e4-57e6-40b0-85f0-34740abcc86e",
    "Poland": "d7850b6b-6747-4ab4-8984-d732da4f364f",
    "Portugal": "689c24a5-f843-4326-9fb3-8032a357a856",
    "Spain": "befbf55c-ae57-4a74-8c95-7eff169527ad",
    "Suède": "7bcd387f-b8d3-4710-a1bc-41703ed5e827",
    "Sweden": "7bcd387f-b8d3-4710-a1bc-41703ed5e827",
    "Switzerland": "ae363594-ac17-40d2-a565-1cb71c104d68",
    "United Kingdom": "857bade0-eb03-4548-b337-f5ded193e5f3",
    "UK": "857bade0-eb03-4548-b337-f5ded193e5f3",
    "United States": "fcc15cea-675e-42ab-b0ee-075cbbaf423a",
    "Malta": None,
}

CUSTOM_FIELD_IDS = {
    "Email": "0db2cbaa-9981-4928-9278-5c09254c957f",
    "Phone": "70085527-cc7c-4eb3-bada-a37173d70133",
    "Country": "e29e1f1f-8676-48e4-9097-137b3c452924",
    "Birthday": "f0aff46e-5373-459a-b848-91fdd83a282c",
    "Instagram": "f8869a0b-5cfd-47c2-a8ca-d228c6b0cc17",
    "Insta Followers": "1d338959-aacb-4e7f-bbbd-cfcbb44f0536",
    "TikTok": "2a28a1e6-0f81-4531-9654-d0b37fccda5f",
    "TikTok Followers": "e07e0bf8-53a1-4d37-a1df-993efcc06933",
    "YouTube": "d81079c1-9a09-4a3c-a27b-df058f30ef02",
    "Active": "f419bb9e-e19f-49c8-9cb4-506b4a05b934",
}


def resolve_status_clickup(status, registration_step):
    if status == "Deleted":
        return "account deleted"
    if status == "Inactive":
        return "new lead"
    if status not in ("Active", "Waiting Approval", "WaitingList", "ConnectSocialMedia", "UserCreated"):
        return "new lead"
    rs = (registration_step or "").strip()
    if status == "Active":
        if rs == "ConnectSocialMedia":
            return "socials linked"
        if rs in ("FavouriteContentTypes", "PhoneNumberVerification", "SelectLocation"):
            return "verified"
        if rs == "UserCreated":
            return "account created"
        return "active"
    if status in ("Waiting Approval", "WaitingList"):
        if rs == "ConnectSocialMedia":
            return "socials linked"
        if rs in ("PhoneNumberVerification", "SelectLocation", "FavouriteContentTypes"):
            return "account created"
        return "waiting list"
    if rs == "ConnectSocialMedia":
        return "socials linked"
    return "new lead"


def resolve_is_active(status):
    return status in ("Active", "Waiting Approval", "WaitingList", "ConnectSocialMedia")


def is_spam(row):
    name = row.get("name", "").strip()
    email = row.get("email_address", "").strip().lower()
    insta = row.get("insta_handles", "").strip().strip('"').strip()
    followers = row.get("insta_followers", "0").strip()
    count = row.get("count", "0").strip()
    if name.lower() == "nikky":
        return True
    if "qa test" in name.lower():
        return True
    if "qa+" in email:
        return True
    if name.lower() == "jdjh":
        return True
    has_ig = insta not in ["", "-", '""']
    has_followers = int(followers) > 0 if followers.isdigit() else False
    has_count = int(count) > 0 if count.isdigit() else False
    if not has_ig and not has_followers and not has_count:
        if re.match(r"^[a-z]{1,4}\d+[a-z]*@", email):
            return True
        if re.match(r"^[a-z]{2,5}[0-9]{4,}@", email):
            return True
    return False


def profile_score(row):
    insta = row.get("insta_handles", "").strip().strip('"').strip()
    followers = row.get("insta_followers", "0").strip()
    tiktok = row.get("tiktok_handles", "").strip().strip('"').strip()
    email = row.get("email_address", "").strip()
    score = 0
    if insta not in ["", "-", '""']:
        score += 100
    if followers.isdigit() and int(followers) > 0:
        score += min(int(followers), 50000) // 100
    if tiktok not in ["", "-", '""']:
        score += 50
    if email:
        score += 10
    return score


def parse_date(date_str):
    if not date_str or date_str.strip() in ["", "-"]:
        return None
    try:
        from datetime import datetime
        dt = datetime.strptime(date_str.strip(), "%Y-%m-%d")
        return int(dt.timestamp() * 1000)
    except:
        return None


def create_task(session, row):
    name = row.get("name", "").strip()
    if not name:
        return None

    insta_handle = row.get("insta_handles", "").strip().strip('"').strip()
    insta_followers = row.get("insta_followers", "0").strip()
    tiktok_handle = row.get("tiktok_handles", "").strip().strip('"').strip()
    tiktok_followers = row.get("tiktok_followers", "0").strip()
    email = row.get("email_address", "").strip()
    phone = row.get("phone_number", "").strip()
    country = row.get("country", "").strip()
    birthday = row.get("birthday", "").strip()
    status = row.get("status", "").strip()
    registration_step = row.get("registration_step", "").strip()
    gender = row.get("gender", "").strip()
    age = row.get("age", "").strip()
    count = row.get("count", "").strip()

    desc_parts = []
    if gender and gender != "-":
        desc_parts.append(f"Gender: {gender}")
    if age and age not in ("", "-", "0"):
        desc_parts.append(f"Age: {age}")
    if count and count not in ("", "-", "0"):
        desc_parts.append(f"Count: {count}")
    if registration_step:
        desc_parts.append(f"RegStep: {registration_step}")
    description = " | ".join(desc_parts) if desc_parts else "Creator profile imported from database"

    status_val = resolve_status_clickup(status, registration_step)
    is_active = resolve_is_active(status)

    custom_fields = []

    if email:
        custom_fields.append({"id": CUSTOM_FIELD_IDS["Email"], "value": email})

    if phone and phone not in ["-", "123", ""]:
        phone_clean = phone.strip()
        if phone_clean.isdigit() and len(phone_clean) > 6:
            if not phone_clean.startswith("+"):
                phone_clean = f"+31{phone_clean}" if phone_clean.startswith("6") else f"+{phone_clean}"
            custom_fields.append({"id": CUSTOM_FIELD_IDS["Phone"], "value": phone_clean})

    country_id = COUNTRY_OPTIONS.get(country.strip() if country else None)
    if country_id:
        custom_fields.append({"id": CUSTOM_FIELD_IDS["Country"], "value": country_id})

    birthday_ms = parse_date(birthday)
    if birthday_ms:
        custom_fields.append({"id": CUSTOM_FIELD_IDS["Birthday"], "value": birthday_ms})

    if insta_handle and insta_handle != "-":
        custom_fields.append({"id": CUSTOM_FIELD_IDS["Instagram"], "value": insta_handle})

    try:
        followers = int(insta_followers) if insta_followers and insta_followers.isdigit() else 0
        custom_fields.append({"id": CUSTOM_FIELD_IDS["Insta Followers"], "value": followers})
    except (ValueError, TypeError):
        pass

    if tiktok_handle and tiktok_handle != "-":
        custom_fields.append({"id": CUSTOM_FIELD_IDS["TikTok"], "value": tiktok_handle})
    else:
        custom_fields.append({"id": CUSTOM_FIELD_IDS["TikTok"], "value": ""})

    try:
        tiktok_f = int(tiktok_followers) if tiktok_followers and tiktok_followers.isdigit() else 0
        custom_fields.append({"id": CUSTOM_FIELD_IDS["TikTok Followers"], "value": tiktok_f})
    except (ValueError, TypeError):
        pass

    custom_fields.append({"id": CUSTOM_FIELD_IDS["Active"], "value": is_active})
    custom_fields.append({"id": CUSTOM_FIELD_IDS["YouTube"], "value": ""})

    payload = {
        "name": name,
        "description": description,
        "status": status_val,
        "priority": 3,
        "custom_fields": custom_fields,
    }

    try:
        resp = session.post(
            f"https://api.clickup.com/api/v2/list/{LIST_ID}/task",
            headers={"Authorization": API_TOKEN, "Content-Type": "application/json"},
            json=payload,
            timeout=30,
        )
        if resp.status_code == 200:
            data = resp.json()
            return {"success": True, "id": data.get("id", "?"), "name": name}
        else:
            return {"success": False, "name": name, "status": resp.status_code, "error": resp.text[:200]}
    except Exception as e:
        return {"success": False, "name": name, "error": str(e)[:200]}


def main():
    with open(CSV_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    no_spam = [r for r in rows if not is_spam(r)]
    spam_removed = len(rows) - len(no_spam)

    name_groups = {}
    for r in no_spam:
        key = r.get("name", "").strip().lower()
        if key not in name_groups:
            name_groups[key] = []
        name_groups[key].append(r)

    deduped = []
    dupes_removed = 0
    for key, group in name_groups.items():
        if len(group) == 1:
            deduped.append(group[0])
        else:
            group.sort(key=profile_score, reverse=True)
            deduped.append(group[0])
            dupes_removed += len(group) - 1

    seen_emails = set()
    email_deduped = []
    email_dupes = 0
    for r in deduped:
        email = r.get("email_address", "").strip().lower()
        if email and email in seen_emails:
            email_dupes += 1
            continue
        if email:
            seen_emails.add(email)
        email_deduped.append(r)

    filtered = email_deduped
    print(f"Original: {len(rows)} | Spam: {spam_removed} | Name dupes: {dupes_removed} | Email dupes: {email_dupes} | Final: {len(filtered)}", flush=True)

    limit = int(sys.argv[1]) if len(sys.argv) > 1 else len(filtered)
    status_filter = sys.argv[2] if len(sys.argv) > 2 else None

    if status_filter:
        filtered = [r for r in filtered if r.get("status", "").strip() == status_filter]

    batch = filtered[:limit]

    print(f"Processing {len(batch)} creators with {WORKERS} workers", flush=True)

    session = requests.Session()
    session.headers.update({"Authorization": API_TOKEN, "Content-Type": "application/json"})

    success = 0
    failed = 0
    total = len(batch)

    with ThreadPoolExecutor(max_workers=WORKERS) as executor:
        futures = {executor.submit(create_task, session, row): i for i, row in enumerate(batch)}

        for future in as_completed(futures):
            result = future.result()
            if result and result.get("success"):
                success += 1
            else:
                failed += 1
                if failed <= 20:
                    err = result.get("error", "Unknown") if result else "Parse error"
                    name = result.get("name", "?") if result else "?"
                    print(f"  FAILED: {name} - {err}", flush=True)

            done = success + failed
            if done % 100 == 0:
                print(f"  --- Progress: {done}/{total} (success: {success}, failed: {failed}) ---", flush=True)

    print("-" * 60, flush=True)
    print(f"Done! Success: {success}, Failed: {failed}, Total: {total}", flush=True)


if __name__ == "__main__":
    main()