import { useEffect, useState } from "react";

const Home = () => {
    const [user, setUser] = useState<{ id: number; first_name: string } | null>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            console.log("Telegram WebApp object:", tg);
            console.log("initDataUnsafe:", tg.initDataUnsafe);
            setUser(tg.initDataUnsafe?.user || null);
        } else {
            console.log("Telegram WebApp not found.");
        }
    }, []);


    return (
        <div>
            <h1>Welcome to Telegram WebApp</h1>
            <p>{user ? `User ID: ${user.id}, Name: ${user.first_name}` : "User info not available."}</p>
        </div>
    );
}

export default Home