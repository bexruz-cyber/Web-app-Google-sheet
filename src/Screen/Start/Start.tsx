import { Link } from "react-router-dom"
import GoBackBtn from "../../components/GoBackBtn";
import arrow from "../../img/svg/arrow.svg"

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
            title: "Google sheets",
            navigate:
                "https://docs.google.com/spreadsheets/d/1wBlVsjonbyX12LQ-7lTwt5OWDx97m2ZGK70LiFjPAEQ/edit?gid=207084512#gid=207084512",
            id: 5,
        },
    ]

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

