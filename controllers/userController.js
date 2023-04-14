import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

/*

1.bycrypt is used for hashing the delecate information such as account number, or password which needs to be stored in
  the database so that it cant be seend by the admin.
2.jwt is jsonwebtoken is usually used for authentication process so as to check if the user that is trying to login/access
  the sensitive information is a legit person or not.

*/

//@desc Register a user
//@route POST api/users
//@access public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(404);
    throw new Error("All fields are necessary");
  }
  const userAvailable = await User.findOne({ email }); // using email as a referece to check if the user is already present or not

  if (userAvailable) {
    res.status(404);
    throw new Error("User Already availbale");
  }

  //Hash Passwords
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({
    //model is used to the method to save the data in the collection
    username,
    email,
    password: hashedPassword, // the password which is hashed is used to save instead of the real data
  });

  console.log(user);
  if (user) {
    res.status(200).json({ message: "User is created" });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc login a user
//@route POST api/users
//@access public

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are necessary");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //comparing the the hashed password with the actual password.
    const accessToken = jwt.sign(
      {
        // payload part of JWT
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(404);
    throw new Error("Email or password is not valid");
  }
});

//@desc current user
//@route get api/users
//@access private

const currentUser = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

export default registerUser;
export { loginUser, currentUser };
