import {createBrowserRouter, createRoutesFromElements, Route, Navigate} from "react-router-dom"
import InitialHome from "../Pages/InitialHome"
import AboutUs from "../Pages/AboutUs"
import Services from "../Pages/Services"
import ContactUs from "../Pages/ContactUs"
import Herosection from "../Components/Herosection"
import Register from "../Pages/Register"
import Loginpage from "../Pages/Loginpage"
import Dashboard from "../Pages/Dashboard"

const router=createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/login"element={<Loginpage/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/" element={<Navigate to="/initialhome/herosection" replace/>}/>
        <Route path="/initialhome"element={<InitialHome/>}>
        <Route path="herosection" element={<Herosection/>}/>
        <Route path="aboutus" element={<AboutUs/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="contactus" element={<ContactUs/>}/>
        </Route>
        <Route path="/dashboard"element={<Dashboard/>}/>

        </>
    )
)

export default router