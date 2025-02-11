import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if ((window as any).Telegram?.WebApp?.initDataUnsafe?.user) {
      setUserId((window as any).Telegram.WebApp.initDataUnsafe.user.id);
    } else {
      console.warn("Foydalanuvchi ma'lumoti mavjud emas");
    }
  }, []);

  return <>
  <h1>ID: {userId}</h1>
  </>;
};

export default Home;
