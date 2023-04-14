import express from "express";
import registerUser, {
  currentUser,
  loginUser,
} from "../controllers/userController.js";
import validateToken from "../middlware/validateTokenHandler.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/current", validateToken, currentUser); // here validation is necessary so is to verify if the usere trying to access is legit or not.

export default userRouter;
