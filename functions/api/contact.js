export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email, name, message } = await request.json();

    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: 'Email and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@top10aigirlfriends.com',
        to: env.CONTACT_EMAIL,
        replyTo: email,
        subject: `New message from ${name || 'Anonymous'} (${email})`,
        html: `
          <p><strong>From:</strong> ${name ? `${name} (${email})` : email}</p>
          <p><strong>Message:</strong></p>
          <pre>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        `,
      }),
    });

    if (!resendResponse.ok) {
      console.error('Resend API error:', await resendResponse.text());
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
