import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate, useParams } from "react-router-dom"
import AuthService from "../Services/auth.service";
import './Login.css';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      Email: "",
      Password: "",
      loading: false,
      message: "",
    };
  }


  onChangeemail(e) {
    this.setState({
      Email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      Password: e.target.value
    });
  }

  // onreload = function () {
  //   let naviagate = useNavigate();
  //   let user = AuthService.getCurrentUser();
  //   (user != null) ? (naviagate("/About")) : (window.location.reload());
  // }

  handleLogin(e) {

    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });


    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.Email, this.state.Password)
        .then(
          (response) => {
            if(response != null)
            window.location.replace(`http://localhost:3000/`);
            else{
              this.setState({
                loading: false,
                message: "Bad Crediantials"
              });
            }
          },
          error => {
            this.setState({
              loading: false,
              message: "Bad Crediantials"
            });
          }
        );
    } else {
      this.setState({
        loading: false
      });
    }

  }

  render() {
    return (
      <div className="col-md-12 ">
        <div className="ccard ccard-container mb-5">
          <img
            src="/Images/Logo_img.svg"
            alt="profile-img"
            className="cprofile-img-card img-fluid"
          />
          <h3 className="text-center text-warning">IndiaTour</h3>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group text-white">
              <label htmlFor="username">Email Id</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.Email}
                onChange={this.onChangeemail}
                validations={[required]}
              />
            </div>

            <div className="form-group text-white">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.Password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group text-center">

              <button
                className="btn btn-warning btn-block mt-3"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}

                <span>Login</span>
              </button>

            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
