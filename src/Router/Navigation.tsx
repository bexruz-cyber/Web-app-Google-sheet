import { Route, Routes } from "react-router-dom";
import Home from "../Screen/Home/Home"
import Sales from "../Screen/Sales/Sales"
import Dashboard from "../Screen/Dashhboard/Dashboard"
import Agent from "../Screen/Agent/Agent";


const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default Navigation