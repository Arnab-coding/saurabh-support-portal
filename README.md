# Digital Support Portal

## Request for Continued Inpatient Care of Dr. Saurabh Ghosh

Initiated by the **NRS Medical College MBBS Batch of 1998**

---

## Overview

This portal allows batchmates of Dr. Saurabh Ghosh to digitally support the request for his continued inpatient care at Pavlov Hospital until an appropriate legal guardian or responsible caregiver becomes available.

The portal records:

- Full Name
- Mobile Number
- Declaration of Support
- Automatic IST Timestamp

All submissions are stored securely in a Google Sheet via Google Apps Script.

---

## Technology Used

- HTML5
- CSS3
- Vanilla JavaScript
- Google Apps Script
- Google Sheets
- GitHub Pages

---

## Features

- Professional hospital-style interface
- Mobile responsive
- Digital support form
- Required declaration
- Automatic IST timestamps
- Duplicate entry prevention
- Live supporter count
- Live supporter list
- Google Sheets backend
- Print-friendly page

---

## Folder Structure

```
Saurabh-Support-Portal/

│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── GoogleAppsScript
       ├── Code.gs
       └── appsscript.json
```

---

## Google Sheet

Rename the first worksheet to

```
Supporters
```

Columns

| Timestamp | Name | Mobile | Declaration |
|-----------|------|---------|-------------|

---

## Google Apps Script

Replace

```javascript
const SHEET_ID="YOUR_SHEET_ID";
```

with your actual Google Sheet ID.

Replace

```javascript
const SHEET_NAME="Sheet1";
```

with

```javascript
const SHEET_NAME="Supporters";
```

Deploy as

- Web App
- Execute As: Me
- Anyone can access

Copy the deployment URL.

---

## JavaScript

Open

```
script.js
```

Replace

```javascript
const API_URL="YOUR_WEB_APP_URL";
```

with the deployed Apps Script URL.

---

## GitHub Deployment

Push all files to GitHub.

Enable GitHub Pages.

Settings

→ Pages

→ Deploy from Branch

→ main

→ /(root)

The website will become available at

```
https://YOUR_USERNAME.github.io/saurabh-support-portal/
```

---

## Workflow

1. Read the support letter.
2. Enter full name.
3. Enter mobile number.
4. Accept the declaration.
5. Submit.

The supporter list and supporter count update automatically.

---

## Privacy

Mobile numbers are stored only in the private Google Sheet.

The public portal displays only:

- Name
- Date & Time of support

No mobile number is displayed publicly.

---

## Contact

Digital Support Portal

NRS Medical College MBBS Batch of 1998