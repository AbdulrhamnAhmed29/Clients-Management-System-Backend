import User from "../../features/users/model/userModel.js"
import bcrypt from "bcrypt"

export const registerController = async (req, res) => {
    const { name, email, password , role} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            message: "Data is Required"
        })
        return;
    }

    const existUser = await User.findOne({ email })
    if (existUser) {
        res.status(400).json({
            success: false,
            message: "the email has been token"
        })
        return;
    }
    const hashpassword = await bcrypt.hash(password, 10);
    try {
      const user =  await User.create({
            name,
            email,
            password: hashpassword,
            role
        })
        res.status(200).json({
            success: true,
            message: "registerd successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }

}