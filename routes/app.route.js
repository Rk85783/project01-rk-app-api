import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { adminProfile } from "../controllers/admin.controller.js";
import { userProfile } from "../controllers/user.controller.js";
import { authorizedToken } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";
const router = Router();

router.post('/register', register);
router.post('/login', login);


router.get('/admin/profile', [authorizedToken, hasRole(['SUPER_ADMIN', 'ADMIN'])], adminProfile);

router.get('/user/profile', [authorizedToken, hasRole(['USER'])], userProfile);

export default router;