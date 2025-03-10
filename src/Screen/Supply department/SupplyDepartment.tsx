import { useEffect, useState } from "react";
import axios from "axios";
import { APIURL, URL } from "../../constants";
import warning from "../../img/svg/warning.svg";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";
import useTaskAdd from "../../Hooks/useTaskAdd ";

interface FormDataType {
  Kimga: string;
  "Yetkazib berildi": string,
  "O'rnatildi": string,
  "Mijoz rozi": string,
  Sana: string
}

const SupplyDepartment = () => {
  const TaskAddFun = useTaskAdd();
  const [salesDepId, setSalesDepId] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    Kimga: "",
    "Yetkazib berildi": "",
    "O'rnatildi": "",
    "Mijoz rozi": "",
    Sana: "",
  });
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<Partial<Record<keyof FormDataType, string>>>({});

  useEffect(() => {
    GetWorkers();
  }, []);

  const GetWorkers = async () => {
    try {
      const { data } = await axios.get(`${APIURL}/workers/`);
      console.log("workers", data);

      const salesDepartment = data.data.find((worker: any) => worker.name === "taminot_bolimi");

      if (salesDepartment) {
        setSalesDepId(salesDepartment.id);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };


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

    if (!salesDepId) {
      toast.error("Sizning ID yingiz topilmadi");
      return;
    }


    if (!validateForm()) return; // Prevent form submission if validation fails
    setLoading(true);

    try {

      await TaskAddFun(salesDepId); // Avval Task qo‘shish funksiyasini chaqiramiz

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString()); // Ensure values are strings
      });

      const response = await axios.post(URL, formDataToSend);
      console.log(response);

      toast.success("Ma'lumot muvaffaqiyatli qo‘shildi! 🎉");


      setFormData({
        Kimga: "",
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
        <h1 className="title" style={{ marginBottom: 0 }}>Taminot Bolimi</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {[
          { label: "Kimga", name: "Kimga", type: "text" },
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
