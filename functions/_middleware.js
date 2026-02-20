export async function onRequest({ request, next, env }) {
  const authHeader = request.headers.get("Authorization");
  const credentials = btoa(`${env.BASIC_USER}:${env.BASIC_PASS}`);
  const expectedAuthHeader = `Basic ${credentials}`;

  if (authHeader !== expectedAuthHeader) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return next();
}
