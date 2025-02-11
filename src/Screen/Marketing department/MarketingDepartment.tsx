import { useState } from "react";
import axios from "axios";
import { URL } from "../../constants";
import warning from "../../img/svg/warning.svg";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";

interface FormDataType {
  "Lidlar Byujeti": string,
  "Lidlar soni": string,
  Sana: string
}

const MarketingDepartment = () => {
  const [formData, setFormData] = useState<FormDataType>({
    "Lidlar Byujeti": "",
    "Lidlar soni": "",
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
      "Lidlar Byujeti": formData["Lidlar Byujeti"] ? "" : "Yetkazib berildi bo‘sh bo‘lmasligi kerak!",
      "Lidlar soni": formData["Lidlar soni"] ? "" : "Lidlar soni bo‘sh bo‘lmasligi kerak!",
      Sana: formData["Sana"]? "" : "Sana bo‘sh bo‘lmasligi kerak!",
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
        "Lidlar Byujeti": "",
        "Lidlar soni": "",
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
        <h1 className="title" style={{ marginBottom: 0 }}>Marketing bo'limi</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {[
          { label: "Lidlar byujeti", name: "Lidlar Byujeti", type: "number" },
          { label: "Lidlar soni", name: "Lidlar soni", type: "number" },
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
                <p className="error">{errors[name as keyof FormDataType]}</p>
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

export default MarketingDepartment;
