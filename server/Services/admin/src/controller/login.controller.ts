import { apiError, asyncHandler, apiResponse , UserModel } from "@packages";


const login = asyncHandler(async (req:any, res:any) => { 
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email });

    if (!user) {
        return apiError(res, 401, "Invalid email or password",);
    }

    const isMatch = await user.comparePassword(password);
    user.generateAuthToken()

    if (!isMatch) {
        return apiError(res, 401, "Invalid email or password");
    }

    const token = user.generateAuthToken();
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };
    res.cookie("token", token, options);
    return apiResponse(res, 201,true, "Login successful",);
})
const logout = asyncHandler(async (req:any, res:any) => {
    res.clearCookie("token");
    return apiResponse(res, 200, true, "Logout successful");
})


export  { login, logout }