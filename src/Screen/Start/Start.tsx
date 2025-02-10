import { Link } from "react-router-dom"
import arrow from "../../img/svg/arrow.svg"
import axios from "axios"
import { APIURL } from "../../constants"
import { useEffect } from "react"

interface ButtonType {
    title: string
    navigate: string
    id: number
}

const Start = () => {
    const ButtonsData: ButtonType[] = [
        {
            title: "Sotuv",
            navigate: "sales",
            id: 1,
        },
        {
            title: "Ishlab chiqarish",
            navigate: "production",
            id: 2,
        },
        {
            title: "Ta'minot bo'lim",
            navigate: "suplyDepartment",
            id: 3,
        },
        {
            title: "Marketing bo'lim",
            navigate: "marketingDepartment",
            id: 4,
        },
        {
            title: "Kunlik hisobot",
            navigate: "dashboard",
            id: 6,
        },
        {
            title: "Google sheets",
            navigate:
                "https://docs.google.com/spreadsheets/d/1Lgc_GNv0aQI-hwxPt25l36XPZArOd4bHjbdcSClm34I/edit?gid=2039146843#gid=2039146843",
            id: 5,
        },
    ]

    const GetWorkers = async () => {
        try {
            const { data } = await axios.get(`${APIURL}/workers/`)
            console.log("workers", data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetWorkers()
    }, [])


    return (
        <div className="container">
            <h1 className="title">Bo'limlar</h1>
            <div className="button-list">
                {ButtonsData.map((btn) => (
                    <Link key={btn.id} to={btn.navigate} className="select-btn">
                        {btn.title}
                        <button className="arrow rotate">
                            <img src={arrow} alt="arrow" />
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Start

