import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

// Ensure process.env.RESEND_API_KEY is defined in .env.local
const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

// Ensure Twilio variables are defined in .env.local
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || "AC_placeholder", 
  process.env.TWILIO_AUTH_TOKEN || "placeholder"
);

export async function POST(req: Request) {
  try {
    const { incidentId, severity, location } = await req.json();

    // 1. Dispatch Email
    const emailPromise = resend.emails.send({
      from: 'Emergency Alert System <onboarding@resend.dev>',
      // Resend test keys only allow sending to the email you signed up with.
      to: process.env.TEST_EMAIL || 'delivered@resend.dev', 
      subject: `🚨 URGENT: Evacuation Order for ${location || "Zone"}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; border: 2px solid #dc2626; padding: 24px; background: #000; color: #fff;">
          <h1 style="color: #ef4444; margin-top: 0;">🚨 EVACUATION ORDER 🚨</h1>
          <h2 style="color: #94a3b8; font-size: 14px;">INCIDENT ID: ${incidentId}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #334155; color: #cbd5e1;"><strong>Location:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #334155; color: #f8fafc; text-align: right;">${location || "Dima Hasao Sector 1"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #334155; color: #cbd5e1;"><strong>Severity:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #334155; color: #ef4444; font-weight: bold; text-align: right;">${severity || "CRITICAL"}</td>
            </tr>
          </table>
          <div style="background: #1e0b0b; border: 1px solid #7f1d1d; padding: 16px; margin-top: 24px;">
            <p style="margin-top: 0; color: #fca5a5; font-size: 16px;"><strong>[EN]</strong> Please evacuate the area immediately. Follow emergency protocols and local authority instructions.</p>
            <p style="margin-top: 8px; margin-bottom: 0; color: #fca5a5; font-size: 16px;"><strong>[HI]</strong> कृपया तुरंत क्षेत्र खाली करें। आपातकालीन प्रोटोकॉल और स्थानीय प्राधिकरण के निर्देशों का पालन करें।</p>
            <p style="margin-top: 8px; margin-bottom: 0; color: #fca5a5; font-size: 16px;"><strong>[AS]</strong> অনুগ্ৰহ কৰি লগে লগে অঞ্চলটো খালী কৰক। জৰুৰীকালীন প্ৰটোকল আৰু স্থানীয় কৰ্তৃপক্ষৰ নিৰ্দেশনা মানি চলক।</p>
            <p style="margin-top: 8px; margin-bottom: 0; color: #fca5a5; font-size: 16px;"><strong>[MNI]</strong> ꯆꯥꯅꯕꯤꯗꯨꯅꯥ ꯃꯐꯝ ꯑꯁꯤ ꯊꯨꯅꯥ ꯊꯥꯗꯣꯛꯎ꯫ ꯑꯦꯃꯔꯖꯦꯟꯁꯤ ꯄ꯭ꯔꯣꯇꯣꯀꯣꯂꯁꯤꯡ ꯑꯃꯁꯨꯡ ꯂꯣꯀꯦꯜ ꯑꯣꯊꯣꯔꯤꯇꯤꯒꯤ ꯌꯥꯊꯪꯁꯤꯡ ꯏꯟꯕꯤꯌꯨ꯫</p>
            <p style="margin-top: 8px; margin-bottom: 0; color: #fca5a5; font-size: 16px;"><strong>[KHA]</strong> Sngewbha pynlait noh ia ka jaka mar mar. Bud ia ki kyndon jingiada bad ki jingbthah jong ki bor ba halor.</p>
            <p style="margin-top: 8px; margin-bottom: 0; color: #fca5a5; font-size: 16px;"><strong>[LUS]</strong> Khawngaihin hmun hi chhuahsan nghal rawh. Chhiatrup thila tihdan tur ruahmanna leh tualchhung thuneitute thupek zawm ang che.</p>
          </div>
          <p style="font-size: 10px; color: #475569; margin-top: 32px; text-align: center;">Automated alert dispatched via BhumiRaksha Operator Console.</p>
        </div>
      `,
    });

    // 2. Dispatch SMS
    const smsPromise = twilioClient.messages.create({
      body: `🚨 EVACUATION ORDER 🚨\nID: ${incidentId}\nLocation: ${location || "Zone"}\n\n[EN] Evacuate area immediately.\n[HI] कृपया तुरंत क्षेत्र खाली करें।\n[AS] অনুগ্ৰহ কৰি লগে লগে অঞ্চলটো খালী কৰক।\n[MNI] ꯆꯥꯅꯕꯤꯗꯨꯅꯥ ꯃꯐꯝ ꯑꯁꯤ ꯊꯨꯅꯥ ꯊꯥꯗꯣꯛꯎ꯫\n[KHA] Sngewbha pynlait noh ia ka jaka mar mar.\n[LUS] Khawngaihin hmun hi chhuahsan nghal rawh.`,
      from: process.env.TWILIO_PHONE_NUMBER || "+10000000000",
      to: process.env.TEST_PHONE_NUMBER || "+10000000000",
    });

    // 3. Dispatch WhatsApp
    const whatsappPromise = twilioClient.messages.create({
      body: `🚨 *EVACUATION ORDER* 🚨\nID: ${incidentId}\nLocation: ${location || "Zone"}\n\n[EN] Evacuate area immediately.\n[HI] कृपया तुरंत क्षेत्र खाली करें।\n[AS] অনুগ্ৰহ কৰি লগে লগে অঞ্চলটো খালী কৰক।\n[MNI] ꯆꯥꯅꯕꯤꯗꯨꯅꯥ ꯃꯐꯝ ꯑꯁꯤ ꯊꯨꯅꯥ ꯊꯥꯗꯣꯛꯎ꯫\n[KHA] Sngewbha pynlait noh ia ka jaka mar mar.\n[LUS] Khawngaihin hmun hi chhuahsan nghal rawh.`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886"}`,
      to: `whatsapp:${process.env.TEST_PHONE_NUMBER || "+10000000000"}`,
    });

    // 4. Dispatch Voice Call
    const voicePromise = twilioClient.calls.create({
      twiml: `
        <Response>
          <Say voice="alice" language="en-US">
            Urgent Emergency Alert. This is the Bhumi Raksha Command Center. 
            An evacuation order has been issued for ${location || "your zone"}. 
            Please evacuate the area immediately. I repeat, evacuate immediately.
          </Say>
        </Response>
      `,
      from: process.env.TWILIO_PHONE_NUMBER || "+10000000000",
      to: process.env.TEST_PHONE_NUMBER || "+10000000000",
    });

    // Run all network requests concurrently
    const results = await Promise.allSettled([emailPromise, smsPromise, whatsappPromise, voicePromise]);

    const emailResult = results[0];
    const smsResult = results[1];
    const whatsappResult = results[2];
    const voiceResult = results[3];

    if (emailResult.status === 'rejected') console.error('Resend Error:', emailResult.reason);
    if (smsResult.status === 'rejected') console.error('Twilio SMS Error:', smsResult.reason);
    if (whatsappResult.status === 'rejected') console.error('Twilio WhatsApp Error:', whatsappResult.reason);
    if (voiceResult.status === 'rejected') console.error('Twilio Voice Error:', voiceResult.reason);

    return NextResponse.json({ 
      success: true, 
      dispatch: {
        email: emailResult.status === 'fulfilled' ? 'Sent' : 'Failed',
        sms: smsResult.status === 'fulfilled' ? 'Sent' : 'Failed',
        whatsapp: whatsappResult.status === 'fulfilled' ? 'Sent' : 'Failed',
        voice: voiceResult.status === 'fulfilled' ? 'Sent' : 'Failed'
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
