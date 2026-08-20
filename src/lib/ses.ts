import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { env } from "@/lib/env";

let cachedClient: SESClient | undefined;

function getClient(): SESClient {
  if (!cachedClient) {
    cachedClient = new SESClient({ region: env.awsRegion });
  }
  return cachedClient;
}

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  const command = new SendEmailCommand({
    Source: env.sesFromEmail,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: "Marmara Market giriş kodun", Charset: "UTF-8" },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Giriş kodun: ${code}\n\nBu kod 10 dakika içinde geçerliliğini yitirecek.\nBu isteği sen yapmadıysan bu e-postayı yok sayabilirsin.`,
        },
      },
    },
  });
  await getClient().send(command);
}
