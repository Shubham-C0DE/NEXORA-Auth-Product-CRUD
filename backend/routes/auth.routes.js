import express from "express";
import {register, login, refresh, getMe, logout} from "../controllers/auth.controller.js"
import {registerValidator, loginValidator} from "../validators/auth.validator.js"
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post (
    "/register",
    registerValidator,
    validate,
    register
);

router.post (
    "/login",
    loginValidator,
    validate,
    login
);


router.post("/login", login)
router.post("/refresh", refresh);
router.get("/me", auth, getMe);
router.post("/logout", auth, logout);


export default router;