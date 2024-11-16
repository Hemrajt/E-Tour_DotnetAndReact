import axios from "axios";
import { useNavigate } from "react-router-dom"


const API_URL = "https://localhost:44381/api";


class AuthService {
  login(Email, Password) {
    return axios
      .post(`${API_URL}/customer/login`, {
        Email,
        Password
      })
      .then(response => {
         {
          localStorage.setItem("user", JSON.stringify(response.data));
          }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(FirstName, LastName, Email, Mobile, DOB, Gender, Password) {
    return axios.post(`${API_URL}/customers`, {
      FirstName,
      LastName,
      Email,
      Mobile,
      DOB,
      Gender,
      Password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
