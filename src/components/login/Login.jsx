import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import jwt from "jsonwebtoken";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Gerçek bir API endpoint'i
  //     const apiUrl = "https://example.com/api/login";

  //     // Gerçek bir API ile iletişim için fetch kullanımı
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     // Yanıt kontrolü
  //     if (response.ok) {
  //       const data = await response.json();

  //       // API tarafından dönen gerçek token
  //       const token = data.token;

  //       // Bearer header oluştur
  //       const bearerToken = `Bearer ${token}`;

  //       // Token'i local storage'a kaydet
  //       localStorage.setItem("token", bearerToken);

  //       // Giriş başarılı mesajını yazdır
  //       console.log("Giriş başarılı!");

  //       // Yönlendirme
  //       navigate("/jeweler");
  //     } else {
  //       // Hatalı yanıt durumunda işlemler
  //       console.error("Giriş başarısız!");
  //       alert("Hatalı kullanıcı adı veya şifre!");
  //     }
  //   } catch (error) {
  //     console.error("Bir hata oluştu:", error.message);
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      // Sahte bir JWT oluştur
      const token = "example_jwt_token";

      // Token'i local storage'a kaydet
      localStorage.setItem("token", token);

      // API isteği yapmadan giriş başarılı mesajını yazdır
      console.log("Giriş başarılı!");

      // Yönlendirme
      navigate("/jeweler");
    } else {
      alert("Hatalı kullanıcı adı veya şifre!");
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleLogin}>
        <h3>Giriş Yap</h3>

        <label htmlFor="username">Kullanıcı Adı</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
