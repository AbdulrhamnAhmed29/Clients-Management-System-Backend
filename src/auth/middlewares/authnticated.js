import jwt from "jsonwebtoken";

const getCookieToken = (cookieHeader) => {
  const tokenCookie = cookieHeader
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="));

  return tokenCookie?.slice("token=".length);
};

export const authenticated = (req, res, next) => {
  const authorization = req.header("Authorization");
  const bearerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const token = bearerToken || getCookieToken(req.header("Cookie"));

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required",
    });
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error("JWT_SECRET is not configured"));
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.NotBeforeError
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }

    return next(error);
  }

  if (
    typeof payload !== "object" ||
    typeof payload.id !== "string" ||
    !["super_admin", "clinic_admin", "employee"].includes(payload.role)
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }

  req.user = { id: payload.id, role: payload.role  , tenantId:payload.tenantId};
  return next();
};