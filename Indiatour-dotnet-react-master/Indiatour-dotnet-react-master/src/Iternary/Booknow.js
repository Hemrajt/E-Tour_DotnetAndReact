
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useEffect, useState } from 'react';
import Passangerform from './Passangerform';
import { useNavigate, useParams } from "react-router-dom";
import SideBooknow from './SideBooknow';
import React, { Component }  from 'react';
import AuthService from '../Services/auth.service';


function Booknow(props) {

    const [customer, setCustomer] = useState([]);
    const { smid,bkid ,cid} = useParams();
    const user = AuthService.getCurrentUser();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/customers/${user.Cust_Id}`)
            .then(res => res.json())
            .then((result) => { setCustomer(result); }
            );

    }, []);

    const [Customers, setCustomers] = useState({});
   
    let navigate = useNavigate();
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setCustomers(values => ({ ...values, [name]: value }))
    // }
    // const handleSubmit = (event) => {
    //     let demo = JSON.stringify(Customers);
    //     console.log(JSON.parse(demo));
    //     fetch("http://localhost:8080/passangers", {
    //         method: 'POST',
    //         headers: { 'Content-type': 'application/json' },
    //         body: demo
    //     }).then(r => { console.log(r.json()) })
    //         navigate("#")
    // }
   


    return (
        <div className="container">
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-1">

                    <img src="/Images/Logo_img.svg" width="100" height="auto" />
                </div>
                <div className="col-11 mt-3">
                    <div >
                        <h1 className="modal-title "> Tells us a little about you</h1>
                    </div>
                </div>

            </div>
            <hr></hr>
            <div className="row">
                <div className="col-8">
                    {customer.map(cust => (<>
                        <Form>
                            <Row className="mb-3">

                                <Form.Group as={Col} controlId="formGridFristName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="FirstName" value={cust.FirstName} disabled />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="LastName" value={cust.LastName} disabled />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="Email" name="Email" value={cust.Email} disabled />
                                </Form.Group>
                                

                            </Row>
                            <Row className="mb-3">
                                <hr></hr>
                                <div className="col-4 mt-1">
                                    <h2>Passanger Details</h2>
                                </div>
                            </Row>

                        </Form>
                        {<Passangerform />}
                        <hr></hr>
                        <div Row="">
                            <div>

                            </div>

                        </div>
                        </> ))}
                    </div>
                
                <div className="col-4">
                    {<SideBooknow />}
                </div>

            </div>
        </div>

    );
}

export default Booknow;