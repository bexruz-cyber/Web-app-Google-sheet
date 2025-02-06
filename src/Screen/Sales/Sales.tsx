import React, { useState } from "react";
import axios from "axios";
import ButtonSubmit from "../../components/ButtonSubmit";
import warning from "../../img/svg/warning.svg"
import GoBackBtn from "../../components/GoBackBtn";
import { toast } from "react-toastify";
import { URL } from "../../constants";


interface FormDataType {
  Qongiroqlar: string;
  "Zamer belgilandi": string;
  "Zamer o'tkazildi": string;
  Sotuv: string;
  Sana: string;
}

const Sales = () => {
  const [formData, setFormData] = useState<FormDataType>({
    Qongiroqlar: "",
    "Zamer belgilandi": "",
    "Zamer o'tkazildi": "",
    Sotuv: "",
    Sana: "",
  });
  const [loading, setLoading] = useState(false)


  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Xatolikni tozalash
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataType> = {
      Qongiroqlar: formData.Qongiroqlar ? "" : "Qo’ng’iroqlar bo‘sh bo‘lmasligi kerak!",
      "Zamer belgilandi": formData["Zamer belgilandi"] ? "" : "Zamer belgilandi bo‘sh bo‘lmasligi kerak!",
      "Zamer o'tkazildi": formData["Zamer o'tkazildi"] ? "" : "Zamer o'tkazildi bo‘sh bo‘lmasligi kerak!",
      Sotuv: formData.Sotuv ? "" : "Sotuv bo‘sh bo‘lmasligi kerak!",
      Sana: formData.Sana ? "" : "Sana bo‘sh bo‘lmasligi kerak!",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === ""); // Agar hamma maydon to‘g‘ri bo‘lsa, `true` qaytaradi
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Agar validatsiya xato bo‘lsa, form yuborilmaydi
    setLoading(true)
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(URL, formDataToSend);
      toast.success("Ma'lumot muvaffaqiyatli qo‘shildi! 🎉");


      setFormData({ Qongiroqlar: "", "Zamer belgilandi": "", "Zamer o'tkazildi": "", Sotuv: "", Sana: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Xatolik! Ma'lumotni qo‘shib bo‘lmadi ❌");
    } finally{
    setLoading(false)
    }
  };

  return (
    <div className="container">
      <div className="header">
        <GoBackBtn/>
        <h1 className="title">Sotuv bo'limi</h1>
      </div>
      <form className="col" onSubmit={handleSubmit}>
        {([
          { label: "Qo’ng’iroqlar", name: "Qongiroqlar", type: "number" },
          { label: "Zamer belgilandi", name: "Zamer belgilandi", type: "number" },
          { label: "Zamer o'tkazildi", name: "Zamer o'tkazildi", type: "number" },
          { label: "Sotuv", name: "Sotuv", type: "number" },
          { label: "Sana", name: "Sana", type: "date" },
        ] as const).map(({ label, name, type }) => (
          <div className="row" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              className={`inp ${errors[name] ? "invalid" : ""}`}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors[name] && (
              <div className="errorBox">
                <p className="errorText">{errors[name]}</p>
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

export default Sales;
