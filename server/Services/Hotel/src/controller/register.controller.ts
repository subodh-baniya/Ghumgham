
import {asyncHandler,apiError,apiResponse,hotelModel} from "@packages"
import type { HotelInput } from "../validator/hotel.validator.js"
import { createHotelSchema } from "../validator/hotel.validator.js"

const registerHotel = asyncHandler(async (req : any,res : any)=>{
    try {
        const parsedData = createHotelSchema.safeParse(req.body);
        if (!parsedData.success) {
            return apiError(res, 400, "Validation error", parsedData.error.issues);
        }
        const hotelData: HotelInput = parsedData.data;
        const newHotel = new hotelModel(hotelData);
        await newHotel.save();
        return apiResponse(res, 201, true, "Hotel registered successfully", newHotel);    
    } catch (error) {
        return apiError(res,500,"Internal server error")
    }
    
})
export default { registerHotel }