//@ts-ignore
import { apiError, asyncHandler, apiResponse ,BannerModel , UserModel, hotelModel,  sendEmail, uploadToCloudinary} from "@packages";
import { mongo } from "mongoose";


const getHotelInfo = asyncHandler(async (req:any, res:any) => {
    const userId = req.user.id;

    hotelModel.aggregate([
        {
            $match: {
                owner: new mongo.ObjectId(userId)
            }
        },
        
    ]).then((result : any[]) => {
        if (result.length === 0) {
            return apiError(res, 404, "Hotel not found for this user");
        }
        apiResponse(res, 200, "Hotel information retrieved successfully", result[0]);
    }).catch((error: any) => {
        console.error("Error fetching hotel information:", error);
        apiError(res, 500, "An error occurred while fetching hotel information");
    }

    );
})
export {
    getHotelInfo
}
