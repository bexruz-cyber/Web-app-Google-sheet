import { Route, Routes } from "react-router-dom"
import Sales from "../Screen/Sales/Sales"
import Login from "../Screen/Auth/Login"
import Start from "../Screen/Start/Start"
import Production from "../Screen/Production/Production"
import SupplyDepartment from "../Screen/Supply department/SupplyDepartment"
import MarketingDepartment from "../Screen/Marketing department/MarketingDepartment"

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/production" element={<Production />} />
            <Route path="/suplyDepartment" element={<SupplyDepartment />} />
            <Route path="/marketingDepartment" element={<MarketingDepartment />} />
        </Routes>
    )
}

export default Navigation