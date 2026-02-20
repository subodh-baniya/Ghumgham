
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

const createroom = asyncHandler(async (req : any,res : any)=>{
    const { hotelId } = req.params;
    const { roomNumber, roomType, pricePerNight ,suitetype } = req.body;

    try {
        const hotel = await hotelModel.findById(hotelId);
        if (!hotel) {
            return apiError(res, 404, "Hotel not found");
        }

        const newRoom = {
            roomNumber,
            roomType,
            pricePerNight,
            suitetype,
        };

        hotel.rooms.push(newRoom);
        await hotel.save();

        return apiResponse(res, 201, true, "Room created successfully", newRoom);
    } catch (error) {
        return apiError(res, 500, "Internal server error");
    }   
  
})



export default { registerHotel, createroom
 }