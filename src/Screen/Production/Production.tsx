import { useState } from "react";
import GoBackBtn from "../../components/GoBackBtn";
import axios from "axios";
import { URL } from "../../constants";
import warning from "../../img/svg/warning.svg";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";

interface FormDataType {
    Kimga: string;
    "Eshik turi": string;
    Soni: string;
    "Olingan sana": string;
    "Topshirilishi kerak sana": string;
    "Topshirilgan sana": string;
}

const Production = () => {
    const [formData, setFormData] = useState<FormDataType>({
        "Eshik turi": "",
        "Olingan sana": "",
        "Topshirilgan sana": "",
        "Topshirilishi kerak sana": "",
        Kimga: "",
        Soni: "",
    });
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState<Partial<FormDataType>>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormDataType> = {
            Kimga: formData["Kimga"] ? "" : "Kimga bo‘sh bo‘lmasligi kerak!",
            "Eshik turi": formData["Eshik turi"] ? "" : "Eshik turi bo‘sh bo‘lmasligi kerak!",
            Soni: formData["Soni"] !== "" ? "" : "Soni bo‘sh bo‘lmasligi kerak!",
            "Olingan sana": formData["Olingan sana"] ? "" : "Olingan sana bo‘sh bo‘lmasligi kerak!",
            "Topshirilishi kerak sana": formData["Topshirilishi kerak sana"]
                ? ""
                : "Topshirilishi kerak sana bo‘sh bo‘lmasligi kerak!",
            "Topshirilgan sana": formData["Topshirilgan sana"]
                ? ""
                : "Topshirilgan sana bo‘sh bo‘lmasligi kerak!",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every((err) => err === ""); // Return true if no errors
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return; // Prevent form submission if validation fails
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value.toString()); // Ensure values are strings
            });

            const response = await axios.post(URL, formDataToSend);
            console.log(response);

            toast.success("Ma'lumot muvaffaqiyatli qo‘shildi! 🎉");


            setFormData({
                "Kimga": "",
                "Eshik turi": "",
                Soni: "",
                "Olingan sana": "",
                "Topshirilgan sana": "",
                "Topshirilishi kerak sana": "",
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Xatolik! Ma'lumotni qo‘shib bo‘lmadi ❌");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <div className="header">
                <GoBackBtn />
                <h1 className="title">Ishlab chiqarish</h1>
            </div>
            <form className="col" onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="Eshik turi">Eshik turi</label>
                    <select
                        className={`inp ${errors["Eshik turi"] ? "invalid" : ""}`}
                        id="Eshik turi"
                        name="Eshik turi"
                        value={formData["Eshik turi"]}
                        onChange={handleChange}
                    >
                        <option>Tanlang</option>
                        <option value="Qiyin">Qiyin</option>
                        <option value="Oson">Oson</option>
                    </select>
                    {errors["Eshik turi"] &&
                        <div className="errorBox">
                            <p className="errorText">{errors["Eshik turi"]}</p>
                            <img src={warning} alt="warning" />
                        </div>
                    }
                </div>
                {[
                    { label: "Kimga", name: "Kimga", type: "text" },
                    { label: "Soni", name: "Soni", type: "number" },
                    { label: "Olingan sana", name: "Olingan sana", type: "date" },
                    { label: "Topshirilishi kerak sana", name: "Topshirilishi kerak sana", type: "date" },
                    { label: "Topshirilgan sana", name: "Topshirilgan sana", type: "date" },
                ].map(({ label, name, type }) => (
                    <div className="row" key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                            type={type}
                            className={`inp ${errors[name as keyof FormDataType] ? "invalid" : ""}`}
                            id={name}
                            name={name}
                            value={formData[name as keyof FormDataType]}
                            onChange={handleChange}
                        />
                        {errors[name as keyof FormDataType] && (
                            <div className="errorBox">
                                <p className="errorText">{errors[name as keyof FormDataType]}</p>
                                <img src={warning} alt="warning" />
                            </div>
                        )}
                    </div>
                ))}
                <ButtonSubmit loading={loading} title="Yuborish" type="submit" fun={handleSubmit} />
            </form>
        </div>
    );
};

export default Production;
