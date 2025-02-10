import axios from "axios";
import ButtonSubmit from "../../components/ButtonSubmit";
import { APIURL } from "../../constants";
import { useState } from "react";

const tg_users: Record<string, string> = {
    boss: "2103708334",
    sotuv_bolimi: "7254847756",
    ishlab_chiqarish: "1446628610",
    taminot_bolimi: "7660253935",
    marketing_bolimi: "6985936718",
};

const AddWorker = () => {
    const [loading, setLoading] = useState(false);
    const [department, setDepartment] = useState("boss");

    const AddWorkerFun = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setLoading(true);

        const telegramId = tg_users[department];

        try {
            const response = await axios.post(`${APIURL}/workers/add`, {
                name: department,
                tg_id: telegramId,
            });
            console.log("Worker added:", response.data);
        } catch (error) {
            console.error("Error adding worker:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login">
            <div className="containerLogin">
                <form className="form" onSubmit={AddWorkerFun}>
                    <h1 className="title" style={{ marginBottom: 0 }}>Ishchi qo'shing</h1>

                    <div className="form-group">
                        <label htmlFor="department">Bo'limni tanlang</label>
                        <select
                            id="department"
                            className="inp"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="boss">Boshliq</option>
                            <option value="sotuv_bolimi">Sotuv bo'limi</option>
                            <option value="ishlab_chiqarish">Ishlab chiqarish</option>
                            <option value="taminot_bolimi">Ta'minot bo‘limi</option>
                            <option value="marketing_bolimi">Marketing bo‘limi</option>
                        </select>
                    </div>

                    <ButtonSubmit title="Qo'shish" loading={loading} type="submit" fun={AddWorkerFun} />
                </form>
            </div>
        </section>
    );
};

export default AddWorker;
