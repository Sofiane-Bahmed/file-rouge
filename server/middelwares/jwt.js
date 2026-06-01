import jwtPackage from "jsonwebtoken";
const { sign, verify } = jwtPackage; 


const jwtSecret = process.env.JWT_SECRET || process.env.SECRET || "default_secret";

export const createToken = (user) => {
  const authToken = sign(
    { _id: user._id, mail: user.mail, userRole: user.userRole },
    jwtSecret
  );

  return authToken;
};

export const adminAutorisation = (req, res, next) => {

    const authToken = req.cookies["auth-token"]?.authToken;
   
    if (!authToken) {
      return res.status(401).json("You are not authorized to access this route.");
    }

    try {
      const decodedToken = verify(authToken, jwtSecret);

      if (!decodedToken || decodedToken.userRole !== "admin") {
        return res.status(401).json({ message: "You are not authorized to access this route." });
      }

      res.locals.userId = decodedToken._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  
  };


  export const mentorAutorisation = (req, res, next) => {

    const authToken = req.cookies["auth-token"]?.authToken;

    if (!authToken) {
      console.log("No auth-token cookie found");
      return res.status(401).json({ message: "You must be authenticated to access this route." });
    }

    try {
      const decodedToken = verify(authToken, jwtSecret);
     
      if (!decodedToken || decodedToken.userRole !== "mentor") {
        console.log("Invalid role or token:", decodedToken?.userRole);
        return res.status(401).json({ message: "You are not authorized to access this route." });
      }
      res.locals.userId = decodedToken._id;
      next();
    } catch (error) {
      console.log("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  
  };


  export const aprenantAutorisation = (req, res, next) => {

    const authToken = req.cookies["auth-token"]?.authToken;
   
    if (!authToken) {
      console.log("No auth-token cookie found (Aprenant)");
      return res.status(401).json({ message: "You must be authenticated to access this route." });
    }
 
    try {
      const decodedToken = verify(authToken, jwtSecret);
      if (!decodedToken || decodedToken.userRole !== "aprenant") {
        console.log("Invalid role or token (Aprenant):", decodedToken?.userRole);
        return res.status(401).json({ message: "You are not authorized to access this route." });
      }
      
      res.locals.userId = decodedToken._id;
      next();
    } catch (error) {
      console.log("JWT Verification Error (Aprenant):", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  
  };

  export const generalAutorisation = (req, res, next) => {
    const authToken = req.cookies["auth-token"]?.authToken;
   
    if (!authToken) {
      return res.status(401).json({ message: "You must be authenticated to access this route." });
    }
 
    try {
      const decodedToken = verify(authToken, jwtSecret);
      res.locals.userId = decodedToken._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  
