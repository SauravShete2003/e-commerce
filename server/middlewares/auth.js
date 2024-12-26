import jwt from "jsonwebtoken";

const jwtVerifyMiddleware = async (req, res, next) => {
  const jwtToken = req.headers?.authorization?.split(" ")[1];
  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = await jwt.verify(jwtToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
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