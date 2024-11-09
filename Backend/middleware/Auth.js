import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT Token:", token_decode); // Log decoded token
    req.user = { id: token_decode.id };
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    } else if (error.message === "jwt malformed") {
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("Google Token Payload:", payload); // Log Google token payload
        req.user = { id: payload.sub };
        return next();
      } catch (googleError) {
        return res.status(400).send("Invalid Google token");
      }
    } else {
      return res.status(400).send("Invalid token");
    }
  }
};

export default authMiddleware;
