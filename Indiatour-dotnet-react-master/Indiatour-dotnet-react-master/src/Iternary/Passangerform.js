
import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import PassangerTable from './PassangerTable';

function Passangerform() {
    let URL_STRING="https://localhost:44381/api"
    const [Passanger, setPassanger] = useState({});
    const { smid, bkid, cid } = useParams();


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPassanger(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            let demo = JSON.stringify(Passanger);
            console.log(JSON.parse(demo));
            fetch(`${URL_STRING}/passanger/postpassanger`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: demo
            }).then(r => {
                console.log(r.json()); alert(" Passanger has Added Successfully ")
                window.location.reload();
            }, error => { alert(error) });
        }
        setValidated(true);

    }


   /* const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/packages/" + bkid)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);*/

    const [cost, setCost] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/costs/${smid}`)
            .then(res => res.json())
            .then((result) => { setCost(result); }
            );
    }, []);


    /*const [booking, setBooking] = useState([]);
        useEffect(() => {
        fetch(`http://localhost:8080/passanger/${bkid}/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);*/


    const [validated, setValidated] = useState(false);

    // function calage(date1) {
    //     const date2 = new Date(date1);
    //     const today = new Date();
    //     const date3 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     const date4 = new Date(date3)
    //     const diff = Math.ceil(date4 - date2);
    //     const fin = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    //     return ((fin))
    //         ;
    // }
    // let sum = 0;
    // function calcost(intialcost) {
    //     sum = sum + parseInt(intialcost)
    //     return (sum
    //     );
    // }


    return (
        <div>
            <div>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFristName" onChange={handleChange}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="Firstname" placeholder="Enter First Name..." required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName" onChange={handleChange} >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="Lastname" placeholder="Enter Last Name..." required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formGridAddress" onChange={handleChange}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="Address" placeholder="1234 Main St" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">

                        {/* <Form.Group as={Col} name="customerid" controlId="formGridcustomerid"  onChange={handleChange}>
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control type="text" name="customerid" value={ cid}  />
                        </Form.Group>
                         <Form.Group as={Col} name="packageid" controlId="formGridpackageid"  onChange={handleChange}>
                            <Form.Label>Package Id</Form.Label>
                            <Form.Control type="text" name="packageid" value={ bkid} onChange={handleChange} />
                        </Form.Group>  */}

                        <div className='row'>
                            <Form.Group as={Col} controlId="formGridCustomerid" name="Customer_Id" onChange={handleChange}>
                                <Form.Label>Customer Id</Form.Label>

                                <Form.Select name="Customer_Id" id="customerid" defaultValue="Choose..." required>
                                    <option>Choose...</option>
                                    <option value={cid}>{cid}</option>
                                </Form.Select>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridpackageid" name="Package_Id" onChange={handleChange}>
                                <Form.Label>Package Id</Form.Label>
                                <Form.Select name="Package_Id" id="packageid" defaultValue="Choose..." required>
                                    <option>Choose...</option>
                                    <option value={bkid}>{bkid}</option>
                                </Form.Select>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </div>



                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFristName" onChange={handleChange}>
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="text" name="Mobile" placeholder="Enter Mobile No...." pattern="[0-9]{10}" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Mobile Number Must be 10 Digit</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFristName" onChange={handleChange}>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="DOB" min="1920-01-01"
                                max="2021-03-31" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFristName" name="Gender" onChange={handleChange}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input mt-3" type="radio" name="Gender" value="Male" id="inlineRadio1" required />
                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input mt-3" type="radio" name="Gender" value="Female" id="inlineRadio2" required />
                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                </div>
                                <div className="form-check form-check-inline ">
                                    <input className="form-check-input mt-3" type="radio" name="Gender" value="others" id="inlineRadio3" required />
                                    <label className="form-check-label" for="inlineRadio3">Others</label>
                                </div>
                            </div>

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} name="City" controlId="formGridCity" onChange={handleChange}>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="City" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState" name="State" onChange={handleChange}>
                            <Form.Label>State</Form.Label>
                            <Form.Select name="State" id="state" defaultValue="Choose..." required>
                                <option>Choose...</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} name="Pincode" controlId="formGridZip" onChange={handleChange}>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" name="Pincode" pattern="[0-9]{6}" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Pincode Must be 6 Digit</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} name="Adharcard" controlId="formGridZip" onChange={handleChange}>
                            <Form.Label>Adharcard Number</Form.Label>
                            <Form.Control type="text" name="Adharcard" pattern="[0-9]{12}" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Adharcard Must be 12 Digit</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} name="Passport" controlId="formGridZip" onChange={handleChange}>
                            <Form.Label>Passport Number</Form.Label>
                            <Form.Control type="text" name="Passport" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridFristName" name="Cost" onChange={handleChange}>
                            <Form.Label>Select Room Type</Form.Label>
                            {cost.map(cst => (
                                <div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="Cost" id="inlineRadio1" value={cst.Singleoccupancy} required />
                                        <label className="form-check-label" for="inlineRadio1">Single Occupancy</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="Cost" id="inlineRadio2" value={cst.Twinperson} required />
                                        <label className="form-check-label" for="inlineRadio2">Twin Sharing</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="Cost" id="inlineRadio3" value={cst.Triplesharing} required />
                                        <label className="form-check-label" for="inlineRadio3">	Triple Sharing</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="Cost" id="inlineRadio3" value={cst.Childwithparents} required />
                                        <label className="form-check-label" for="inlineRadio3">Child with Bed</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="Cost" id="inlineRadio3" value={cst.Childwithoutparents} required />
                                        <label className="form-check-label" for="inlineRadio3">Child without Bed</label>
                                    </div>
                                </div>
                            ))}
                        </Form.Group>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Row>
                    <Button className="mt-3 mb-3" variant="warning" type="submit"  >
                        Add Passanger
                    </Button>
                </Form>

            </div>
            <hr />
            {<PassangerTable />}
        </div>
    );
}

export default Passangerform;