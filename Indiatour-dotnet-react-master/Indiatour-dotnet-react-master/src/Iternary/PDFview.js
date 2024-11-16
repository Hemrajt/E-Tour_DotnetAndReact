
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

import React from 'react';
function PDFview() {


    const [customer, setCustomer] = useState([]);
    const { smid, bkid, cid } = useParams();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/customers/${cid}`)
            .then(res => res.json())
            .then((result) => { setCustomer(result); }
            );

    }, []);

    const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/package/getpackage/${bkid}`)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

    const [booking, setBooking] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/passanger/getdetails/${bkid}/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    function calD(date1, date2) {
        const date3 = new Date(date1);
        const date4 = new Date(date2);
        const diff = Math.abs(date4 - date3);//ms
        const fin = diff / (1000 * 60 * 60 * 24);//
        return (fin)
            ;
    }
    function calN(date1, date2) {
        const date3 = new Date(date1);
        const date4 = new Date(date2);
        const diff = Math.abs(date4 - date3);
        const fin = diff / (1000 * 60 * 60 * 24);
        return (fin - 1)
            ;
    }

    const input = document.getElementById("print");
    function generatepdf() {
        html2canvas(input).then((canvas) => {

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', -50, 5, 310, 250);
            pdf.save(`Invoice${cid}${bkid}${bookingdate}.pdf`);

        });
        handleSubmit();
    }

    function calage(date1) {
        const date2 = new Date(date1);
        const today = new Date();
        const date3 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const date4 = new Date(date3)
        const diff = Math.ceil(date4 - date2);
        const fin = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        return ((fin))
            ;
    }
    function calperson(person) {
        var acount = 0;
        var ccount = 0;
        person.map(per => {
            let age = calage(per.DOB);
            if (age > 12) {
                acount++
            }
            else {
                ccount++
            }
        })

        let totalcount = acount + ccount;
        return (totalcount)
    }

    function calcost(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.Cost)
        });
        return (sum);
    }

    function calGst(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.Cost)
        });
        return (sum * 0.05);
    }
    function caltoalcost(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.Cost)
        });
        return (sum + sum * 0.05);
    }
    function currentdate() {
        const today = new Date();
        const bookingdates = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return bookingdates;
    }

    const [bookingdetails, setBookingdetails] = useState({});
    const [bookingtotalcost, setBookingtotalcost] = useState();
    const [bookinggstcost, setBookinggstcost] = useState();
    const [bookingcost, setBookingcost] = useState();
    const [totalpassanger, setTotalpassanger] = useState();
    const [bookingdate, setBookingdate] = useState();
    const [Cust_Id, setCustomerid] = useState(cid);
    const [Package_Id, setPackageid] = useState(bkid);

    function handleChange() {
        const Touramount = calcost(booking);
        const Taxes = calGst(booking);
        const Totalamount = caltoalcost(booking);
        const Passangers = calperson(booking);
        const today = new Date();
        const Bookingdate = `${today.getFullYear()}-${(today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : `${(today.getMonth() + 1)}`}-${(today.getDate()) < 10 ? `0${(today.getDate())}` : `${(today.getDate())}`}`
        // const bookingdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const newdetails = {
            bookingtotalcost: setBookingtotalcost(Totalamount),
            bookinggstcost: setBookinggstcost(Taxes),
            bookingcost: setBookingcost(Touramount),
            totalpassanger: setTotalpassanger(Passangers),
            bookingdate: setBookingdate(Bookingdate)
        }
        const bookingdetail = { Touramount, Taxes , Totalamount, Passangers, Bookingdate, Cust_Id, Package_Id }
        setBookingdetails(bookingdetail);

    }
    const handleSubmit = (event) => {

        let demo = JSON.stringify(bookingdetails);
        console.log(JSON.parse(demo));
        fetch(`${URL_STRING}/bookings`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: demo,
        }).then(r => { console.log(r.json()) })
    }

    return (
        <div id="print">
            <div className="container"  >
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">

                            <div className="col-5">
                                <img src="/Images/Logo_img.svg" width="100" height="auto" />
                            </div>
                            <div className="col-7 mt-4 ">
                                <div >
                                    <h1 className="modal-title ">Tour deatils</h1>
                                </div>
                            </div>

                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="mt-3 text-center">
                                {pack.map((pkg, i) => (
                                    <div>
                                        <h2 className="ms-2 mb-2 text-warning">{pkg.Package_Name}</h2>
                                        <h3 className="ms-2 mb-2 text-secondary">From {pkg.Startdate} to {pkg.Enddate}</h3>
                                        <h3 className="ms-2 text-secondary">{calD(`${pkg.Startdate}`, `${pkg.Enddate}`)} Days , {calN(`${pkg.Startdate}`, `${pkg.Enddate}`)} Nights </h3>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <div className="row mt-3">
                            <div className="col-4 text-center">
                                <h3>Customer Details</h3>
                            </div>
                            <div className="col-4">
                                <h2></h2>
                            </div>
                            <div className="col-2 text-center">
                                <h4>Current Date -</h4>
                            </div>
                            <div className="col-2 text-center">
                                <h4>{currentdate()}</h4>
                            </div>

                        </div>
                        <hr>
                        </hr>
                        <div className="row">
                            <div className="col-12 mt-3">

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
                                    <Row className="mb-3">
                                        <hr></hr>
                                        <div className="col-12 mt-1">
                                            <div id="Cost">

                                                <h2>Passnger Details</h2>
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Sr. No.</th>
                                                            <th scope="col">First Name</th>
                                                            <th scope="col">Last Name</th>
                                                            <th scope="col">Gender</th>
                                                            <th scope="col">Age</th>
                                                            <th scope="col">Cost</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {booking.map((book, i) => (
                                                            <>
                                                                <tr key={i}>
                                                                    <th scope="row">{i + 1}</th>
                                                                    <td>{book.Firstname}</td>
                                                                    <td>{book.Lastname}</td>
                                                                    <td>{book.Gender}</td>
                                                                    <td>{calage(`${book.DOB}`)}</td>
                                                                    <td>₹{book.Cost}</td>
                                                                </tr>
                                                            </>
                                                        ))}
                                                        <tr>

                                                            <td colSpan="4">
                                                                Total Passanger
                                                            </td>
                                                            <td colSpan="2">
                                                                {calperson(booking)}
                                                            </td>
                                                        </tr>
                                                        <tr>

                                                            <td colSpan="5">
                                                                Tour cost
                                                            </td>
                                                            <td colSpan="1">
                                                                ₹{calcost(booking)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="5">
                                                                GST (2.5% SGST + 2.5% CGST)
                                                            </td>
                                                            <td colSpan="1">
                                                                ₹{calGst(booking)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="5">
                                                                Total Cost for Tour(included Gst)
                                                            </td>
                                                            <td colSpan="1">
                                                                <b> ₹{caltoalcost(booking)}</b>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br />
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="mb-5 noprint" >
                                        <Form>
                                            <Form.Group as={Col} controlId="formGridCustomerid" name="paymentmode" onChange={handleChange}>
                                                <Form.Label>Select payemnt Mode</Form.Label>
                                                <Form.Select name="paymentmode" id="paymentmode" defaultValue="Choose..." required>
                                                    <option>Choose...</option>
                                                    <option >Credit Card</option>
                                                    <option >Debit Card</option>
                                                    <option >Net Banking</option>
                                                    <option >UPI</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <div className="text-center mt-3">
                                                <Button className="btn btn-warning mb-2 btn-lg" data-html2canvas-ignore="true" id="btn" type="button" onClick={generatepdf}>Book a Tour
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </>))}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >

    )
}

export default PDFview;