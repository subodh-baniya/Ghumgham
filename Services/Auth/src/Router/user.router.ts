import { Router } from "express";
import { loginUser, logoutUser, registerUser,} from "../Controllers/user.controller.ts";
import { authMiddleware , superAdminMiddleware ,moderatorMiddleware ,adminMiddleware} from "../Middleware/Auth.middleware.ts";

const router = Router(); 


router.post("/register", registerUser);
router.post("/logout",authMiddleware, logoutUser);
router.post("/login", loginUser);


export default router;


