import { useState, useEffect } from "react";

const Home: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUserId(window.Telegram.WebApp.initDataUnsafe.user.id);
        } else {
            console.warn("Foydalanuvchi ma'lumoti mavjud emas");
        }
    }, []);

    return (
        <div>
            <h1>ID: {userId !== null ? userId : "Yuklanmoqda..."}</h1>
        </div>
    );
};

export default Home;
