import { useState } from "react";
import GoBackBtn from "../../components/GoBackBtn";
import axios from "axios";
import { URL } from "../../constants";
import warning from "../../img/svg/warning.svg";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";

interface FormDataType {
  "Yetkazib berildi": string,
  "O'rnatildi": string,
  "Mijoz rozi": string,
  Sana: string
}

const SupplyDepartment = () => {
  const [formData, setFormData] = useState<FormDataType>({
    "Yetkazib berildi": "",
    "O'rnatildi": "",
    "Mijoz rozi": "",
    Sana: ""
  });
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<Partial<Record<keyof FormDataType, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormDataType, string>> = {
      "Yetkazib berildi": formData["Yetkazib berildi"] ? "" : "Yetkazib berildi bo‘sh bo‘lmasligi kerak!",
      "O'rnatildi": formData["O'rnatildi"] ? "" : "O'rnatildi bo‘sh bo‘lmasligi kerak!",
      "Mijoz rozi": formData["Mijoz rozi"] ? "" : "Mijoz bo‘sh bo‘lmasligi kerak!",
      Sana: formData["Sana"] ? "" : "Sana bo‘sh bo‘lmasligi kerak!"
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
        "Yetkazib berildi": "",
        "O'rnatildi": "",
        "Mijoz rozi": "",
        Sana: ""
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
        <h1 className="title" style={{marginBottom: 0}}>Taminot Bolimi</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {[
          { label: "Yetkazib berildi", name: "Yetkazib berildi", type: "number" },
          { label: "O'rnatildi", name: "O'rnatildi", type: "number" },
          { label: "Mijoz rozi", name: "Mijoz rozi", type: "number" },
          { label: "Sana", name: "Sana", type: "date" },
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

export default SupplyDepartment;
