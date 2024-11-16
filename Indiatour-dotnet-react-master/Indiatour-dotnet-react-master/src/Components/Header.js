import { Link } from "react-router-dom";
import { Component } from "react"
import './Header.css';
import AuthService from "../Services/auth.service";
import EventBus from "../Common/EventBus";
import { useEffect, useState } from 'react';

class Header extends Component {
   
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: (user.Roles==1),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    userdetails=function () {
        const user = AuthService.getCurrentUser();
        const custid = user.Cust_Id;
        const [customer, setCustomer] = useState([]);
        let URL_STRING="https://localhost:44381/api"
        useEffect(() => {
            fetch(`${URL_STRING}/customers/${custid}`)
                .then(res => res.json())
                .then((result) => { setCustomer(result); }
                );
        }, []);
    }


    // const [isLogin, setIslogin] = useState(false)

    // const togglebutton = (event) => {


    //     if (event.target.value == "Login")
    //         setIslogin(true)
    //     else
    //         setIslogin(false);
    // }


    // const AuthButton = (props) => {
    //     let { isLoggedIn, ondatachange } = props;
    //     if (isLoggedIn) {
    //         return <button type="button" name="logoutbtn" className="btn btn-warning ms-1 mt-sm-2 mb-sm-2" data-bs-toggle="modal"
    //         data-bs-target="#LogoutModal" value="Logout" onClick={ondatachange} >Logout</button>;
    //     } else {
    //         return <button type="button" name="loginbtn" className="btn btn-warning ms-1 mt-sm-2 mb-sm-2" data-bs-toggle="modal"
    //         data-bs-target="#LoginModal" value="Login" onClick={ondatachange} >Login</button>;
    //     }
    // };

    render() {
        const { currentUser, showAdminBoard } = this.state;
    
        return (

            <div className="noprint">
                {/*Navbar*/}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="nav_bar">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold img-fluid fs-4 mt-1" to="/" style={{ color: "rgb(245, 232, 51)" }} ><img src="/Images/Logo_img.svg"
                            width="60" height="auto" />IndiaTour</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mt-0 mb-lg-0">
                                <li className="nav-item nav_name">
                                    <Link className="nav-link active" to="/"><b>Home</b></Link>
                                </li>
                                <li className="nav-item nav_name">

                                    <Link className="nav-link" to="/about"><b>About</b></Link>
                                </li>
                                <li className="nav-item nav_name">

                                    <Link className="nav-link" to="/#Tour"><b>Tours</b></Link>
                                </li>
                                <li className="nav-item nav_name">
                                    <Link className="nav-link" to="/Gallery"><b>Gallery</b></Link>

                                </li>
                                <li className="nav-item nav_name">
                                    <a href="#contactus" className="nav-link"><b>Contact us</b></a>
                                    {/*<Link className="nav-link" to="#contactus"><b>Contact Us</b></Link>*/}
                                </li>
                                {/* {showAdminBoard && (
                                    <li className="nav-item">
                                        <Link to={"/admin"} className="nav-link">
                                            Admin Board
                                        </Link>
                                    </li>
                                )} */}

                                {currentUser && (
                                    <li className="nav-item">
                                        <Link to={"/"} className="nav-link">
                                          
                                        </Link>
                                    </li>
                                )}
                            </ul>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        {currentUser.Roles==1 ? (
                                            <li className="nav-item">
                                                <Link to={"/Admin"} className="nav-link">
                                                    <button className="btn btn-warning mt-2"><i class="bi bi-person-lines-fill size"></i></button>
                                                </Link>
                                            </li>
                                        ) : (<li className="nav-item">
                                            <Link to={"/Profile"} className="nav-link">
                                                <button className="btn btn-warning mt-2"><i class="bi bi-person-lines-fill size"></i></button>
                                            </Link>
                                        </li>)}
                                        {/* <Link to={"/profile"} className="nav-link">
                                            <button className="btn btn-warning mt-2"><i class="bi bi-person-lines-fill size"></i></button>
                                        </Link> */}
                                    </li>
                                    <li className="nav-item">
                                        <a href="/" className="nav-link" onClick={this.logOut}>
                                            <button className="btn btn-warning mt-sm-2 mb-sm-2">Logout</button>
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            <button className="btn btn-warning mt-sm-2 mb-sm-2">Login</button>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            <button className="btn btn-warning mt-sm-2 mb-sm-2">Sign Up</button>
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </div>

                        {/* <button type="button" name="loginbtn" className="btn btn-warning ms-1 mt-sm-2 mb-sm-2" data-bs-toggle="modal"
                            data-bs-target="#LoginModal"  >Login</button>
                        <button type="button" name="signupbtn" className="btn btn-warning ms-1 mt-sm-2 mb-sm-2" data-bs-toggle="modal"
                            data-bs-target="#SignupModal">SignUp</button> */}
                    </div>
                </nav >
            </div >
        );
    }
}

export default Header;