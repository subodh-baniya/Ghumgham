import jwt from "jsonwebtoken";
import { apiError} from "@packages";

const roleMiddleware = async (req:any, res:any, next:any) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return apiError(res, 401, "Unauthorized");
    }

    try {
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded.role !== "admin" || decoded.role !== "superadmin") {
            return apiError(res, 403, "Forbidden: Insufficient permissions");
        }
        req.user = decoded;
        next();
    } catch (error) {
        return apiError(res, 401, "Invalid token", error);
    }
}
