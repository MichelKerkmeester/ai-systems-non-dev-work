---
title: "Product Owner - Examples - Bug - Mobile Crash - v0.100"
description: "Instantiates Bug Report Template section 2. Shows crash-log evidence and an explicitly labelled memory-pressure hypothesis instead of an asserted root cause."
version: "0.100"
contextType: asset
---

# App crashes when attaching a large gallery photo on Android 12

### About

---

In the Loopline Android app, selecting the `4032x3024`, `8.7MB` JPEG test photo from the device gallery crashes the app and returns to the home screen on two Android 12 devices.

| Field           | Value                              |
| --------------- | ------------------------------------ |
| Frequency       | Sometimes                          |
| Severity        | Critical                           |
| Platform        | Android                            |
| Device          | Samsung Galaxy A53, Google Pixel 6  |
| OS Version      | Android 12 (API 31)                |
| Browser         | Not applicable (native app)        |
| Browser Version | Not applicable (native app)        |

**References:**

**Flows**
- [Composer - Attach photo](https://www.figma.com/file/loopline-mobile/composer?node-id=55-201)

**Components**
- [Photo attachment picker](https://www.figma.com/file/loopline-mobile/composer?node-id=55-244)

---

### Bug

---

**1. Observed Behavior**

---

When a user selects the `4032x3024`, `8.7MB` JPEG test photo from the message composer, the app crashes within about a second
- The composer screen freezes briefly, then the app closes without warning and the Android home screen appears
- No in-app error dialog is shown. The crash is silent from the user's perspective
- The draft message, including any typed text, is lost when the app reopens
- The `1920x1080`, `1.4MB` JPEG control image attached successfully in 10 of 10 attempts on both Android 12 devices

Steps to Reproduce:
1. Open Loopline on a Samsung Galaxy A53 running Android 12
2. Open any conversation and tap the photo icon in the composer
3. Select "Choose from gallery"
4. Pick the `loopline-gallery-4032x3024.jpg` test photo, which is `4032x3024` pixels and `8.7MB`
5. Observe the app crash within about a second of selecting the photo

Screen recording: Not provided. Crash log excerpt captured below.

```text
07-10 09:14:22.481  8842  8842 E AndroidRuntime: FATAL EXCEPTION: main
07-10 09:14:22.481  8842  8842 E AndroidRuntime: Process: com.loopline.android, PID: 8842
07-10 09:14:22.481  8842  8842 E AndroidRuntime: java.lang.OutOfMemoryError: Failed to allocate a 47185920 byte allocation with 25165824 free bytes and 94MB until OOM
07-10 09:14:22.481  8842  8842 E AndroidRuntime:     at android.graphics.BitmapFactory.nativeDecodeStream(Native Method)
07-10 09:14:22.481  8842  8842 E AndroidRuntime:     at android.graphics.BitmapFactory.decodeStream(BitmapFactory.java:719)
07-10 09:14:22.481  8842  8842 E AndroidRuntime:     at com.loopline.android.composer.PhotoAttachmentLoader.loadFromUri(PhotoAttachmentLoader.kt:88)
```

Hypothesis, unverified, needs engineering confirmation: the composer may decode the full-resolution bitmap into memory before creating the preview and may not downsample the image first. The `OutOfMemoryError` and `BitmapFactory.decodeStream` frame support this hypothesis but do not confirm the root cause.

Reproduction rate: reproduced in 9 of 10 attempts on the Galaxy A53 and 7 of 10 attempts on the Pixel 6, both on Android 12, using `loopline-gallery-4032x3024.jpg`. It reproduced in 0 of 10 attempts on a Pixel 7 Pro running Android 14 with the same file.

---

**2. Expected Behavior**

---

Selecting `loopline-gallery-4032x3024.jpg` should attach the photo without closing the app or clearing the draft
- Design spec: Not provided
- Previous working behavior: photo attachment worked without crashing in the previous app release, version 2.14.0, on the same test devices, per the QA regression log
- User expectation: users can attach a supported gallery photo without losing their draft message

Checklist
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Bug no longer reproducible
- [ ] No regressions introduced

---

### BDD Scenarios

---

**Scenario:** Attaching a large gallery photo does not crash the app
- **Given** a user has an open conversation with a draft message typed in the composer
- **When** the user selects the `4032x3024`, `8.7MB` test photo from the gallery
- **Then** the photo attaches successfully, the composer remains open and the draft message text stays intact
