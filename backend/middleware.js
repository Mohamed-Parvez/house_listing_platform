import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.json("token not found");
  }
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    req.email = verify.email;
    next();
  } catch {
    res.json("token verification failed, please provide valid token");
  }
};

export default Authenticate;
