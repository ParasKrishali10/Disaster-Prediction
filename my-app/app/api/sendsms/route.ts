import twilio from "twilio";

export async function POST(req: Request) {
  try {
    console.log("fetching")
    const { lat, lon } = await req.json();

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    const message = await client.messages.create({
      body: `🚨 SOS ALERT!\n\nLocation: https://maps.google.com/?q=${lat},${lon}\n\nPlease respond immediately.`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: process.env.EMERGENCY_CONTACT!,
    });

    return Response.json({ success: true, sid: message.sid });
  } catch (err: any) {
    console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}
