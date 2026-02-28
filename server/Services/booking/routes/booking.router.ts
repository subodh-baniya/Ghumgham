import Router from "express"
import { esewaSuccess,createBooking } from "../controller/booking.controller.js";

const router=Router();

router.route("/esewapaymentinitialize").post(createBooking)

router.route("/esewasuccess").post(esewaSuccess)