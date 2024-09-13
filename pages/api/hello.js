// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createHmac, randomBytes } from "crypto";
const SECRET_KEY = Buffer.from(
  "6ab979680bdf6fedba1f15b947eeaa91b177ea51047e535f5c08b5eda8feae4f",
  "hex"
);

function hmacSha256(data, key) {
  return createHmac("sha256", key).update(data).digest();
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const token = req.query.token;
  const hmac = Buffer.from(req.query.hmac, "hex");

  const expectedHmac = hmacSha256(Buffer.from(token, "hex"), SECRET_KEY);

  if (!hmac.equals(expectedHmac)) {
    res.status(400).send("Invalid HMAC");
    return;
  }

  // Mock authentication function. Replace this with actual authentication logic.
  const authenticate = () => ({
    email: "user@example.com",
    name: "John Doe",
    link: "google.com",
    photo:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
  });

  const { email, name, link, photo } = authenticate();

  const payloadJson = JSON.stringify({ token, email, name, link, photo });
  const payloadHex = Buffer.from(payloadJson).toString("hex");

  const newHmac = hmacSha256(Buffer.from(payloadJson), SECRET_KEY);
  const encodedHmac = newHmac.toString("hex");

  const redirectUrl = `https://commento.io/api/oauth/sso/callback?payload=${payloadHex}&hmac=${encodedHmac}`;

  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
