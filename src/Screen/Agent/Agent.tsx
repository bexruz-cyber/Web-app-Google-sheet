import React, { useState } from "react";
import axios from "axios";
import ButtonSubmit from "../../components/ButtonSubmit";
import warning from "../../img/svg/warning.svg";
import { toast } from "react-toastify";
import { URL } from "../../constants";

interface FormDataType {
  "Kirilgan yangi do’konlar soni": string;
  "Sotuvlar soni": string;
  "Sotuv miqdori": string;
  "Qarz": string;
  "Savdo": string;
  "Tushum": string;
  "Sana": string;
}

const Agent = () => {
  // const [salesDepId, setSalesDepId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    "Kirilgan yangi do’konlar soni": "",
    "Sotuvlar soni": "",
    "Sotuv miqdori": "",
    "Qarz": "",
    "Savdo": "",
    "Tushum": "",
    "Sana": "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataType> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormDataType]) {
        newErrors[key as keyof FormDataType] = `${key} bo‘sh bo‘lmasligi kerak!`;
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!salesDepId) {
    //   toast.error("Sizning ID yingiz topilmadi");
    //   return;
    // }

    if (!validateForm()) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(URL, formDataToSend);
      console.log("Form response:", response);

      setFormData({
        "Kirilgan yangi do’konlar soni": "",
        "Sotuvlar soni": "",
        "Sotuv miqdori": "",
        "Qarz": "",
        "Savdo": "",
        "Tushum": "",
        "Sana": "",
      });
      toast.success("Ma'lumot muvaffaqiyatli qo‘shildi! 🎉");
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
        <h1 className="title" style={{ marginBottom: 0 }}>Agent bo'limi</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {([
          { label: "Kirilgan yangi do’konlar soni", name: "Kirilgan yangi do’konlar soni", type: "number" },
          { label: "Sotuvlar soni", name: "Sotuvlar soni", type: "number" },
          { label: "Sotuv miqdori", name: "Sotuv miqdori", type: "number" },
          { label: "Qarz", name: "Qarz", type: "number" },
          { label: "Savdo", name: "Savdo", type: "number" },
          { label: "Tushum", name: "Tushum", type: "number" },
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
                <p className="error">{errors[name]}</p>
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

export default Agent;
