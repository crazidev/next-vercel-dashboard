import moment from "moment";

/**
 * Parses an expiration string like "2d", "3h", "15m" and returns a Unix timestamp.
 */
const getExpirationTime = (expiresIn: string): moment.Moment => {
  const match = expiresIn.match(/^(\d+)([dhms])$/);

  if (!match) {
    throw new Error("Invalid expiresIn format. Use formats like '2d', '3h', '15m'.");
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  // Map unit to a corresponding moment.js duration
  switch (unit) {
    case 'd':
      return moment().add(value, 'days');
    case 'h':
      return moment().add(value, 'hours');
    case 'm':
      return moment().add(value, 'minutes');
    case 's':
      return moment().add(value, 'seconds');
    default:
      throw new Error("Invalid time unit. Use 'd' for days, 'h' for hours, 'm' for minutes, 's' for seconds.");
  }
};

// Utility to handle base64url encoding and decoding
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Base64url encoding
const base64UrlEncode = (input: string | Uint8Array): string => {
  const base64 = Buffer.from(input).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// Base64url decoding
const base64UrlDecode = (input: string): Uint8Array => {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4); // Add padding if needed
  return Buffer.from(base64 + padding, "base64");
};

// HMAC SHA-256 signing
const hmacSha256 = async (key: string, data: string): Promise<string> => {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
  return base64UrlEncode(new Uint8Array(signature));
};

// Type for the JWT Payload
interface JwtPayload {
  [key: string]: any; // The payload can be a JSON object with dynamic properties
}

// Create JWT (signing the token with expiration)
export const createJwtToken = async (
  payload: any,
  secret: string,
  expiresIn: string = "1h" // Default to 1 hour
): Promise<string> => {
  // JWT header
  const header = {
    alg: "HS256", // HMAC with SHA-256
    typ: "JWT",
  };

  // Convert the human-readable expiresIn to seconds using moment
  const expirationTime = getExpirationTime(expiresIn).unix();

  const payloadWithExpiration = {
    ...payload,
    exp: expirationTime,
  };

  // Base64url encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payloadWithExpiration));

  // Data to sign (header.payload)
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  // Create signature using HMAC SHA-256
  const signature = await hmacSha256(secret, dataToSign);

  // Return the full JWT token
  return `${dataToSign}.${signature}`;
};

// Decode JWT payload
export const decodeJwtToken = (token: string): { header: object; payload: JwtPayload } => {
  const [encodedHeader, encodedPayload] = token.split(".");
  const decodedHeader = JSON.parse(decoder.decode(base64UrlDecode(encodedHeader)));
  const decodedPayload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload)));

  return { header: decodedHeader, payload: decodedPayload };
};

// Verify JWT and check if expired
export const verifyJwtToken = async (token: string, secret: string): Promise<JwtPayload | null> => {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  // Data to verify (header.payload)
  const dataToVerify = `${encodedHeader}.${encodedPayload}`;

  // Create the expected signature
  const expectedSignature = await hmacSha256(secret, dataToVerify);

  // Compare the expected signature with the provided signature
  if (expectedSignature !== signature) {
    // Invalid token
    return null;
  }

  // Decode the payload
  const decodedPayload = decodeJwtToken(token).payload;

  // Check if the token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
  if (decodedPayload.exp < currentTime) {
    return null; // Token is expired
  }

  // If the token is valid and not expired, return the decoded payload
  return decodedPayload;
};

// Decode JWT payload and check expiration manually
export const decodeAndCheckExpiration = (token: string): { expired: boolean; message: string | JwtPayload } => {
  const [encodedHeader, encodedPayload] = token.split(".");

  // Base64url decode the payload
  const decodedPayload: JwtPayload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload)));

  // Check if the token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
  if (decodedPayload.exp < currentTime) {
    return { expired: true, message: "Token is expired" };
  }

  // If not expired, return the decoded payload
  return { expired: false, message: decodedPayload };
};

// Example usage
// (async () => {
//   const secret = "your-secret-key";
//   const payload = { userId: 123 };

//   // Create a token with an expiration time of 2 days
//   const token = await createJwtToken(payload, secret, "1m");
//   logger("JWT Token:", token);

//   // Verify the token
//   const verifiedPayload = await verifyJwtToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiZXhwIjoxNzMzNTg1NjUxfQ.gS9e2LoCZjQ1EqJE0lTCaPwbqNtinVAqAfuDBP5XWz0', secret);
//   if (verifiedPayload) {
//     logger("Token is valid:", verifiedPayload);
//   } else {
//     logger("Token is invalid or expired");
//   }
// })();
