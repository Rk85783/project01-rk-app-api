import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { adminCreate, adminDelete, adminEdit, adminList, adminProfile, adminView } from "../controllers/admin.controller.js";
import { userProfile } from "../controllers/user.controller.js";
import { authorizedToken } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";
const router = Router();

// ----------------> Auth Controller Routes
router.post("/register", register);
router.post("/login", login);

// ----------------> Admin Controller Routes
router.post("/admin/create", [authorizedToken, hasRole(["SUPER_ADMIN"])], adminCreate);
router.get("/admin/list", [authorizedToken, hasRole(["SUPER_ADMIN"])], adminList);
router.get("/admin/view/:id", [authorizedToken, hasRole(["SUPER_ADMIN"])], adminView);
router.put("/admin/edit/:id", [authorizedToken, hasRole(["SUPER_ADMIN"])], adminEdit);
router.delete("/admin/get/:id", [authorizedToken, hasRole(["SUPER_ADMIN"])], adminDelete);
router.get("/admin/profile", [authorizedToken, hasRole(["SUPER_ADMIN", "ADMIN"])], adminProfile);

// ----------------> User Controller Routes
router.get("/user/profile", [authorizedToken, hasRole(["USER"])], userProfile);

export default router;
