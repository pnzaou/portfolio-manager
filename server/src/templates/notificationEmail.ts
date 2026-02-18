export const notificationEmailTemplate = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nouveau message</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
              <div style="width:60px;height:60px;background:rgba(255,255,255,0.15);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
                <!-- Bell icon SVG -->
                <img src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png" width="32" height="32" alt="notif" style="filter:brightness(10)"/>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                Nouveau message reçu
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">
                Depuis ton portfolio personnel
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#1a1a2e;padding:40px;border-left:1px solid rgba(99,102,241,0.2);border-right:1px solid rgba(99,102,241,0.2);">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:24px;">
                    <p style="margin:0 0 16px;color:#a1a1aa;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                      Expéditeur
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:10px;">
                          <span style="color:#6366f1;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Nom</span><br/>
                          <span style="color:#f4f4f5;font-size:16px;font-weight:600;margin-top:4px;display:block;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="color:#6366f1;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br/>
                          <a href="mailto:${email}" style="color:#06b6d4;font-size:16px;font-weight:500;margin-top:4px;display:block;text-decoration:none;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px;color:#a1a1aa;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                Message
              </p>
              <div style="background:rgba(6,182,212,0.06);border-left:3px solid #06b6d4;border-radius:0 12px 12px 0;padding:24px;">
                <p style="margin:0;color:#e4e4e7;font-size:15px;line-height:1.8;white-space:pre-wrap;">
                  ${message.replace(/\n/g, "<br/>")}
                </p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Votre message sur mon portfolio"
                      style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                      ↩ Répondre à ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#13131f;border:1px solid rgba(99,102,241,0.15);border-radius:0 0 16px 16px;padding:24px;text-align:center;">
              <p style="margin:0;color:#52525b;font-size:12px;">
                © ${new Date().getFullYear()} · Portfolio de Perrin Emmanuel Nzaou
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;