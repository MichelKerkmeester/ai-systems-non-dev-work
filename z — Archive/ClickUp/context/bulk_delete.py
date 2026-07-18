#!/usr/bin/env python3
"""Delete all tasks from a ClickUp list in parallel."""

import requests
import sys
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

API_TOKEN = os.environ.get("CLICKUP_API_KEY", "pk_224591351_3FLS0W4F1TIZ9UD7A1RN2Y38O6NOKTP2")
LIST_ID = "901523087782"
WORKERS = 20
HEADERS = {"Authorization": API_TOKEN}

def get_all_task_ids():
    all_ids = []
    page = 0
    while True:
        r = requests.get(f"https://api.clickup.com/api/v2/list/{LIST_ID}/task?include_closed=true&page={page}", headers=HEADERS, timeout=30)
        data = r.json()
        tasks = data.get("tasks", [])
        for t in tasks:
            all_ids.append(t["id"])
        print(f"Page {page}: {len(tasks)} tasks (total: {len(all_ids)})", flush=True)
        if data.get("last_page") or len(tasks) == 0:
            break
        page += 1
    return all_ids

def delete_task(session, task_id):
    try:
        r = session.delete(f"https://api.clickup.com/api/v2/task/{task_id}", headers=HEADERS, timeout=15)
        if r.status_code in (200, 204):
            return True
        else:
            return f"ERR_{r.status_code}"
    except Exception as e:
        return f"EXC_{str(e)[:50]}"

def main():
    print("Collecting task IDs...", flush=True)
    task_ids = get_all_task_ids()
    print(f"Total tasks to delete: {len(task_ids)}", flush=True)
    print(f"Deleting with {WORKERS} workers...", flush=True)

    session = requests.Session()
    deleted = 0
    failed = 0

    with ThreadPoolExecutor(max_workers=WORKERS) as executor:
        futures = {executor.submit(delete_task, session, tid): tid for tid in task_ids}
        for future in as_completed(futures):
            result = future.result()
            if result is True:
                deleted += 1
            else:
                failed += 1
                if failed <= 10:
                    tid = futures[future]
                    print(f"  Failed: {tid} - {result}", flush=True)

            done = deleted + failed
            if done % 100 == 0:
                print(f"  Progress: {done}/{len(task_ids)} (deleted: {deleted}, failed: {failed})", flush=True)

    print(f"\nDone! Deleted: {deleted}, Failed: {failed}, Total: {len(task_ids)}", flush=True)

if __name__ == "__main__":
    main()