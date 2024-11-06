import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, please login or sign up",
    });
  }

  try {
    // Try verifying as a JWT token first
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    } else if (error.message === "jwt malformed") {
      // If JWT verification fails, check if it's a Google token
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        req.body.userId = payload.sub; // 'sub' is the unique Google user ID
        next();
      } catch (googleError) {
        return res.status(400).send("Invalid token");
      }
    } else {
      // Handle other JWT errors
      return res.status(400).send("Invalid token");
    }
  }
};

export default authMiddleware;
