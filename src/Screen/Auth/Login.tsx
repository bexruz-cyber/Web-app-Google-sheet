import axios from "axios";
import ButtonSubmit from "../../components/ButtonSubmit";
import { APIURL } from "../../constants";
import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const PostDataFun = async (e: React.FormEvent) => {
    e.preventDefault(); // Sahifa yangilanib ketmasligi uchun

    setLoading(true); // Yuborish jarayonida tugmani bloklash
    try {
      const { data } = await axios.post(APIURL, {
        grant_type: "password",
        username: userName,
        password: password,
        scope: "",
        client_id: "",
        client_secret: ""
      });

      console.log("Success:", data);
    } catch (error:any) {
      console.error("Error:", error.response.data);
    } finally {
      setLoading(false); // Tugmani yana faollashtirish
    }
  };

  return (
    <section className="login">
      <div className="containerLogin">
        <form onSubmit={PostDataFun} className="form">
          <h1 className="title" style={{ marginBottom: 10 }}>Login</h1>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="inp"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="inp"
          />
          <ButtonSubmit loading={loading} title="Submit" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default Login;
