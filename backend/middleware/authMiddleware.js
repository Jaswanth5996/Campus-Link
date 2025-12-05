const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  console.log(' protect middleware called');
  console.log(" Full req.headers:", req.headers);  // Optional: for debug

  const header = req.headers.authorization;

  console.log(" Authorization Header:", header);

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or malformed token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    //Set user ID in req.user
    req.user = { _id: decoded.id };

    next();
  } catch (err) {
    console.error(" JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
