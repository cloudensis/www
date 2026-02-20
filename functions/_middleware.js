export async function onRequest({ request, next }) {
  const BASIC_USER = process.env.BASIC_USER;
  const BASIC_PASS = process.env.BASIC_PASS;
  const authHeader = request.headers.get("Authorization");
  const credentials = btoa(`${BASIC_USER}:${BASIC_PASS}`);
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
