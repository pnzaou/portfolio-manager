export const confirmationEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Message reçu</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#06b6d4,#6366f1,#8b5cf6);border-radius:16px 16px 0 0;padding:48px 40px;text-align:center;">
              <!-- Checkmark circle -->
              <div style="width:72px;height:72px;background:rgba(255,255,255,0.15);border-radius:50%;margin:0 auto 20px;text-align:center;line-height:72px;font-size:32px;">
                ✓
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">
                Message bien reçu !
              </h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.78);font-size:15px;line-height:1.6;">
                Merci de m'avoir contacté, <strong>${name}</strong>.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#1a1a2e;padding:48px 40px;border-left:1px solid rgba(99,102,241,0.2);border-right:1px solid rgba(99,102,241,0.2);">

              <p style="margin:0 0 24px;color:#a1a1aa;font-size:15px;line-height:1.8;text-align:center;">
                J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais. <br/>
                En attendant, vous pouvez découvrir mes projets ou me suivre sur mes réseaux.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent);margin:32px 0;"></div>

              <!-- Social links -->
              <p style="margin:0 0 20px;color:#a1a1aa;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-align:center;">
                Retrouvez-moi ici
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:0 8px;">
                    <a href="https://github.com/pnzaou" target="_blank"
                      style="display:inline-block;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);color:#a5b4fc;text-decoration:none;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;margin:4px;">
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/perrin-emmanuel-nzaou-37941b307/" target="_blank"
                      style="display:inline-block;background:rgba(6,182,212,0.10);border:1px solid rgba(6,182,212,0.25);color:#67e8f9;text-decoration:none;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;margin:4px;">
                      LinkedIn
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent);margin:32px 0;"></div>

              <!-- Signature -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.15);border-radius:12px;padding:24px;text-align:center;">
                    <p style="margin:0 0 4px;color:#f4f4f5;font-size:16px;font-weight:700;">
                      Perrin Emmanuel Nzaou
                    </p>
                    <p style="margin:0 0 12px;color:#8b5cf6;font-size:13px;font-weight:500;">
                      Développeur Full-Stack
                    </p>
                    <a href="mailto:nzaouperrinemmanuel@gmail.com"
                      style="color:#06b6d4;font-size:13px;text-decoration:none;">
                      nzaouperrinemmanuel@gmail.com
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
                Cet email a été envoyé automatiquement suite à votre message sur mon portfolio.<br/>
                © ${new Date().getFullYear()} · Perrin Emmanuel Nzaou
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