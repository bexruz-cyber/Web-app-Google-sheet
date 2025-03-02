import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Navigation from "./Router/Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [telegramId, setTelegramId] = useState<number | null>(null);

  useEffect(() => {
    WebApp.ready(); // Telegram WebApp ni ishga tushirish

    const userId = WebApp.initDataUnsafe?.user?.id;
    if (userId) {
      setTelegramId(userId);
      toast.success(`Sizning Telegram ID: ${userId}`);
    } else {
      toast.error("Telegram foydalanuvchi ID topilmadi");
    }
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>Telegram ID:</h3>
        <p>{telegramId ? telegramId : "Foydalanuvchi topilmadi"}</p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
