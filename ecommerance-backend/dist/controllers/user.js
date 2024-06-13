import { User } from "../models/User.js";
import { TryCatch } from "../middleware/error.js";
import Errorhandler from "../utils/utility-class.js";
// User Created Api
export const newUser = TryCatch(async (req, res, next) => {
    const { _id, name, email, photo, dob, gender } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `welcome, ${user.name}`,
        });
    }
    if (!_id || !name || !email || !photo || !dob || !gender) {
        return next(new Errorhandler("please fill all fields", 400));
    }
    user = await User.create({ _id, name, email, photo, dob, gender });
    return res.status(200).json({
        success: true,
        message: `welcome, ${user.name}`,
    });
});
// Api for all user
export const getAllUsers = TryCatch(async (req, res, next) => {
    const alluser = await User.find({});
    return res.status(200).json({
        succes: true, alluser
    });
});
// Api for single user
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new Errorhandler("Invalid Id", 400));
    return res.status(200).json({
        succes: true, user
    });
});
//Api for delete user
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new Errorhandler("Invalid Id", 400));
    await user.deleteOne();
    return res.status(200).json({
        succes: true, message: "User deleted successfully"
    });
});
