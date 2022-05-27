module.exports = basicAuth;
const service = require("../services/service");

async function basicAuth(req: any, res: any, next: any) {
  // make authenticate path public
  if (req.path === "/users/authenticate") {
    return next();
  }

  // check for basic auth header
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  let [username, password] = credentials.split(":");
  username = username as string;
  password = password as string;
  const account = await service.authenticate(username, password);
  if (!account) {
    return res
      .status(401)
      .json({ message: "Invalid Authentication Credentials" });
  }

  // attach user to request object
  req.account = account;

  next();
}
