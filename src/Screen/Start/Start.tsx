import { Link } from "react-router-dom";
import arrow from "../../img/svg/arrow.svg"

interface ButtonType {
    title: string;
    navigate: string;
    id: number;
}

const Start = () => {
    const ButtonsData: ButtonType[] = [
        {
            title: "Sotuv",
            navigate: "sales",
            id: 1
        },
        {
            title: "Ishlab chiqarish",
            navigate: "production",
            id: 2
        },
        {
            title: "Ta'minot bo'lim",
            navigate: "suplyDepartment",
            id: 3
        },
        {
            title: "Marketing bo'lim",
            navigate: "marketingDepartment",
            id: 4
        },
        {
            title: "Google sheets",
            navigate: "https://docs.google.com/spreadsheets/d/1wBlVsjonbyX12LQ-7lTwt5OWDx97m2ZGK70LiFjPAEQ/edit?gid=207084512#gid=207084512",
            id: 5
        },
    ]
    return (
        <div className="container col">
            <h1 className="title" style={{marginBottom: 10}}>Bo'limlar</h1>
            {ButtonsData.map((btn) => (
                <Link key={btn.id} to={btn.navigate} className="selectBtn">
                    {btn.title}
                    <img src={arrow} alt="arrow" className="arrow" />
                </Link>
            ))}
        </div>
    )
}

export default Start