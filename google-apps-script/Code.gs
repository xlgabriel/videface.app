/**
 * VideFace contact form → Google Sheets
 *
 * Setup:
 *   1. Open the target Google Sheet
 *   2. Extensiones > Apps Script
 *   3. Paste this file as `Code.gs`
 *   4. Adjust SHEET_NAME if you renamed the tab (default: "Contacts")
 *   5. Deploy > New deployment > type "Web app"
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   6. Copy the deployment URL into Contact.jsx (SHEETS_WEBHOOK_URL)
 */

const SHEET_NAME = 'Contacts';

// Anti-spam rate limits
const MAX_PER_EMAIL_PER_HOUR = 3;     // same email: 3 submits / hour
const MAX_GLOBAL_PER_MINUTE  = 20;    // whole form: 20 submits / minute

const HEADERS = ['Timestamp', 'Name', 'Company', 'Email', 'Phone', 'Message'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    // --- Validation -----------------------------------------------------
    const required = ['name', 'company', 'email', 'message'];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return jsonResponse({ ok: false, error: 'missing_field:' + field });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return jsonResponse({ ok: false, error: 'invalid_email' });
    }
    if (String(body.message).length > 5000) {
      return jsonResponse({ ok: false, error: 'message_too_long' });
    }

    // --- Rate limit (global, per minute) -------------------------------
    const cache = CacheService.getScriptCache();
    const minuteBucket = Math.floor(Date.now() / 60000);
    const globalKey = 'g_' + minuteBucket;
    const globalCount = parseInt(cache.get(globalKey) || '0', 10);
    if (globalCount >= MAX_GLOBAL_PER_MINUTE) {
      return jsonResponse({ ok: false, error: 'rate_limit_global' });
    }
    cache.put(globalKey, String(globalCount + 1), 90);

    // --- Rate limit (per email, per hour) ------------------------------
    const emailKey = 'e_' + body.email.toLowerCase();
    const emailCount = parseInt(cache.get(emailKey) || '0', 10);
    if (emailCount >= MAX_PER_EMAIL_PER_HOUR) {
      return jsonResponse({ ok: false, error: 'rate_limit_email' });
    }
    cache.put(emailKey, String(emailCount + 1), 3600);

    // --- Append row ----------------------------------------------------
    const sheet = ensureSheet();
    ensureFilter(sheet);
    const phoneRaw = String(body.phone || '').trim();

    sheet.appendRow([
      new Date(),
      String(body.name).trim(),
      String(body.company).trim(),
      String(body.email).trim(),
      '', // phone is set below to control formatting
      String(body.message).trim(),
    ]);

    // Set the phone cell explicitly as text. appendRow alone can parse
    // strings starting with "+" or "=" as formulas (→ #ERROR!), so we
    // format the cell as text first and then write the literal value.
    if (phoneRaw) {
      const lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 5).setNumberFormat('@').setValue(phoneRaw);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: 'server_error: ' + err.message });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'videface-contact-sheet' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Adds a basic filter to the header row if one doesn't exist yet.
 * Lets users sort by Timestamp (Z→A for newest first) and filter by
 * date range directly from the Sheet UI. Safe to call on every write.
 */
function ensureFilter(sheet) {
  if (sheet.getFilter()) return;
  const range = sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length);
  range.createFilter();
}

/**
 * Returns the Contacts sheet, creating and styling it the first time.
 */
function ensureSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(SHEET_NAME);
  sheet.appendRow(HEADERS);

  // Header styling
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#0A6CFF')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Column widths (1-indexed)
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 160); // Name
  sheet.setColumnWidth(3, 180); // Company
  sheet.setColumnWidth(4, 230); // Email
  sheet.setColumnWidth(5, 160); // Phone
  sheet.setColumnWidth(6, 420); // Message

  // Timestamp date format
  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd hh:mm');

  // Phone column forced to plain text
  sheet.getRange('E2:E').setNumberFormat('@');

  // Message column wraps text
  sheet.getRange('F2:F').setWrap(true);

  // Light vertical alignment for data rows
  sheet.getRange('A2:F').setVerticalAlignment('middle');

  // Remove unused columns past the table to keep it tidy
  const maxCols = sheet.getMaxColumns();
  if (maxCols > HEADERS.length) {
    sheet.deleteColumns(HEADERS.length + 1, maxCols - HEADERS.length);
  }

  return sheet;
}
