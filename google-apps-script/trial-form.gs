/**
 * Scaalus trial form → your Gmail.
 * Paste this into a new Google Apps Script project (script.google.com),
 * then Deploy → New deployment → Web app:
 *   Execute as: Me    Who has access: Anyone
 * The /exec URL and this SECRET are set in lib/leads.ts.
 */
const SECRET = "nQAwuaH89Tp8eJEmj9hpwXLH";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return reply({ ok: false, error: "bad secret" });

    const options = { name: "Scaalus website", htmlBody: data.html };
    if (data.replyTo) options.replyTo = data.replyTo;

    // Sends from your Gmail to your Gmail.
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      data.subject,
      data.text,
      options,
    );
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Run this once from the editor to grant permission and get a test email. */
function testEmail() {
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(),
    "Scaalus form test",
    "If you got this, the script can email you.",
  );
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
