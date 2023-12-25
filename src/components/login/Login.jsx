import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sahte bir API endpoint'i
      const apiUrl = "http://52.29.240.45:3001/v1/auth/login";

      // Sahte bir API ile iletişim için axios kullanımı
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      // Yanıt kontrolü
      if (response.status === 200) {
        localStorage.setItem(
          "accessToken",
          response.data?.tokens?.access?.token
        );
        localStorage.setItem(
          "refreshToken",
          response.data?.tokens?.refresh?.token
        );

        console.log("Giriş başarılı!");

        // Yönlendirme
        navigate("/jeweler");
      } else {
        console.error("Giriş başarısız!");
        alert("Hatalı kullanıcı adı veya şifre!");
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error.message);
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleLogin}>
        <h3>Giriş Yap</h3>

        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
