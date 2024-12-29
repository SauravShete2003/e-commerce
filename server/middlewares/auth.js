import jwt from "jsonwebtoken";

const jwtVerifyMiddleware = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  // Check if Authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const jwtToken = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);

    // Ensure the decoded token contains required fields
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: "Malformed token" });
    }

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
};

const checkRoleMiddleware = async (req, res, next) => {
  const userRole = req?.user?.role;
  const method = req.method;
  const path = req.path;
  if (method === "POST" && path === "/products" && userRole !== "admin"){
    return res.status(403).json({
      message: "You don't have permission to perform this action"
    })
  }
  next()
};

export  {jwtVerifyMiddleware , checkRoleMiddleware};