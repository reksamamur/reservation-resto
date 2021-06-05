import express from "express";
import createError from "http-errors";
import Users from "../models/Users.model";

const router = express.Router();

router.route("/signup").post(async (req, res, next) => {
  try {
    const { email, password, name, phone, level } = req.body;

    if (!email || !password || !name || !phone || !level)
      throw new createError.BadRequest("Bad Request");

    const emailExist = await Users.findOne({ email: email });

    if (emailExist)
      throw new createError.Conflict(`${email} is already registered`);

    await new Users({ email, password, name, phone, level }).save();

    res.status(200).json({
      status: 200,
      message: "Data Submitted",
    });
  } catch (error) {
    next(error);
    new createError.InternalServerError(error.message)
  }
});

router.route("/signin").post((req, res) => {});

router.route("/signout").delete((req, res) => {});

export default router;
