import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import React  from 'react';
import Form from 'react-bootstrap/Form'

import './Book.css';
import Noofperson from "./Noofperson";

function SideBooknow() {

    const [pack, setPackage] = useState([]);
    const { bkid, smid, cid, } = useParams();
    let URL_STRING="https://localhost:44381/api";
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

    const canclebooking = (event) => {
        fetch(`${URL_STRING}/passanger/cancelpassanger`, {
            method: 'Delete'

        })
            .then(res => res.json())
            .then((result) => {
                setBooking(result);
            });
            window.location.reload(false)

    }

    function calcost(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.Cost)
        });
        return (sum);
    }

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

    function convertdate(date)
    {
        const date1=new Date(date);
        const converteddate = `${date1.getFullYear()}-${(date1.getMonth() + 1) < 10 ? `0${(date1.getMonth() + 1)}` : `${(date1.getMonth() + 1)}`}-${(date1.getDate()) < 10 ? `0${(date1.getDate())}` : `${(date1.getDate())}`}`

        return converteddate;
    }

    // function convertdate(date)
    // {
    //     const date1=new Date(date);
    //     let month=date1.toLocaleString('en-us', { month: 'long' });
    //     let day=date1.getDay;
    //     let year=date1.getFullYear;

    //     let fdate=day.toString + month.toString +year.toString;
    //     return fdate;
    // }

    return (
        <>
            {/* <!-- Date Side Box --> */}
            <div className="Date_border">
                <div>
                    <h3 className="mt-4">
                    </h3>

                    <div className="container">
                        {pack.map((pkg) => (
                            <>
                                <div className="row">
                                    <h2 className="ms-2 text-warning">{pkg.Package_Name}</h2>
                                    <hr />


                                    <div>
                                        <h3 className="ms-2 text-secondary">{calD(`${pkg.Startdate}`, `${pkg.Enddate}`)} Days , {calN(`${pkg.Startdate}`, `${pkg.Enddate}`)} Nights </h3>
                                        <hr></hr>
                                        {/* <br />{calD(`${pkg.startdate}`, `${pkg.enddate}`)}D/{calN(`${pkg.startdate}`, `${pkg.enddate}`)}N */}

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <span>Tour Starts</span>
                                        <h5>{convertdate(pkg.Startdate)}</h5>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-1 text-secondary"><i class="bi bi-arrow-right"></i></h2>
                                    </div>
                                    <div className="col-5">
                                        <span>Tour End</span>
                                        <h5>{convertdate(pkg.Enddate)}</h5>
                                    </div>
                                </div>

                                <hr></hr>
                                <div>
                                    {<Noofperson />}
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <h5>Super Deal Price</h5>

                                    <h3> ₹{calcost(booking)}
                                    </h3>

                                </div>
                                <br>
                                </br>
                                <div className="row">
                                    <div className="d-grid gap-2 col-6">
                                        <Form >
                                            <Link to={`/view/${bkid}/${smid}/${cid}`}><Button className="btn btn-warning mb-2 btn-lg" type="submit">Checkout</Button></Link>
                                        </Form>
                                    </div>

                                    <div className="col-6 d-grid gap-2">
                                        <Form >
                                            <Button className="btn btn-warning mb-2 btn-lg" type="button" onClick={canclebooking}>Cancle</Button>
                                        </Form>
                                    </div>
                                </div>
                            </>
                        ))}</div>

                </div>
            </div >
        </>
    );
}

export default SideBooknow;