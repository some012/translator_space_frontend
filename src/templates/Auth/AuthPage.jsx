import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "/src/assets/Logo.png";
import {saveToken} from "../../utils/Auth.js";

const AuthPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", login);
      formData.append("password", password);

      const response = await axios.post("http://192.168.0.14:8000/api/v1/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      saveToken(response.data.access_token);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError("Нет ответа от сервера. Проверьте соединение.");
      }
    }
  };


  return (
    <div className="lab1">
      <img src={Logo} className="logo_ts" alt="logo"/>
      <form onSubmit={handleSubmit} className="lab1_form">
        <input
          className="lab1_input"
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          className="lab1_input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="lab1_buttons">
          <button className="lab1_button" type="submit">Войти</button>
        </div>
        {error && <p style={{ color: "red", marginTop: "10px",}}>{error}</p>}
      </form>
    </div>
  );
};

export default AuthPage;
