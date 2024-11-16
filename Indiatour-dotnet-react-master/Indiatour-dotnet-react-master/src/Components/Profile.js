import { useEffect, useState, useRef } from 'react';
import AuthService from '../Services/auth.service'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';

function Profile() {

    const [customer, setCustomer] = useState([]);
    const user = AuthService.getCurrentUser();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/customers/${user.Cust_Id}`)
            .then(res => res.json())
            .then((result) => { setCustomer(result); }
            );

    }, []);
    const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/tourpackages`)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

    const [booking, setBooking] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/bookingtour/getbookings/${user.Cust_Id}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    const res = pack.filter(el => {
        return booking.find(element => {
            return element.Package_Id === el.Package_Id;
        });
    });
 
    function convertdate(date) {
        const date1 = new Date(date);
        const converteddate = `${date1.getFullYear()}-${(date1.getMonth() + 1) < 10 ? `0${(date1.getMonth() + 1)}` : `${(date1.getMonth() + 1)}`}-${(date1.getDate()) < 10 ? `0${(date1.getDate())}` : `${(date1.getDate())}`}`

        return converteddate;
    }

    const handledelete = (passid) => {

        fetch(`${URL_STRING}/bookingtour/setflag/${passid}`, {
            method: 'Put',
        }).then(r => {
            console.log(r.json()); alert("Sucessfully Created Request for Cancel Tour.....Wait for Admin to approve");
            window.location.reload();
        }, error => { alert(error) });
        
        refreshpage();
   
    }

    function refreshpage() {

        window.location.reload(false);
    }

    return (

        <div className="container">

            <div className="row">
                <div className="col-12 mt-3">
                    <h2 className="text-warning">Your Information</h2>
                    {customer.map(cust => (<>

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
                    </>))}
                </div>
                <hr></hr>
                <div className="row">
                    <h2 className="text-warning">Your Bookings</h2>
                    <div className="col-12 mt-1">
                        <div id="Cost">
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Package Name</th>
                                        <th scope="col">Number of Passanger</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Total Cost</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {booking.map((book, i) => (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{book.Booking_Id}</td>
                                                {res.filter((tor) => tor.Package_Id === book.Package_Id ).map((pkg) => (
                                                    <td>{pkg.Package_Name}</td>
                                                ))}
                                                <td>{book.Passangers}</td>
                                                <td>{convertdate(book.Bookingdate)}</td>
                                                <td>₹{book.Totalamount}</td>
                                                <td><Button className="mt-0 mb-0" variant="danger" type="submit" onClick={() => {
                                                    const confirmBox = window.confirm(
                                                        "Do you really want to Cancel this Tour"
                                                    )
                                                    if (confirmBox === true) {

                                                        handledelete(book.Booking_Id);
                                                       
                                                    }
                                                }}>
                                                    <i class="bi bi-trash"></i>
                                                </Button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
} export default Profile;
