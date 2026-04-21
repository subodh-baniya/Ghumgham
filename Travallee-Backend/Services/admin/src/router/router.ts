import { Router } from "express";
import { getHotelInfo } from "../controller/admin/controller.js";


const router = Router();

router.get('hotel-info', getHotelInfo);


export default router;  