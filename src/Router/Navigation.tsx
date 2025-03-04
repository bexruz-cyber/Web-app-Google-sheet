import { Route, Routes } from "react-router-dom";
import Home from "../Screen/Home/Home"
import Sales from "../Screen/Sales/Sales"
import Production from "../Screen/Production/Production"
import SupplyDepartment from "../Screen/Supply department/SupplyDepartment"
import MarketingDepartment from "../Screen/Marketing department/MarketingDepartment"
import Dashboard from "../Screen/Dashhboard/Dashboard"


const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/production" element={<Production />} />
            <Route path="/suplyDepartment" element={<SupplyDepartment />} />
            <Route path="/marketingDepartment" element={<MarketingDepartment />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default Navigation