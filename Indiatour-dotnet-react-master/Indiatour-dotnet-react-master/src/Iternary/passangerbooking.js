import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, useParams } from 'react-router-dom';
import React  from 'react';
function Passangerbooking() {

    const [booking, setBooking] = useState([]);
    const { smid, bkid, cid } = useParams();
    let navigate = useNavigate();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/passanger/getdetails/${bkid}/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    // const handledelete = (passid) => {
    //     fetch("http://localhost:8080/delete/" + passid, {
    //         method: 'Delete'
    //     })
    //         .then(res => res.json())
    //         .then((result) => {
    //             setBooking(result);
    //         });
    //     alert("Sucessfully Deleted Passanger");
    //     refreshpage();

    // }

    // function refreshpage() {

    //     window.location.reload(false);
    // }
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

    function calcost(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.cost)
        });
        return (sum);
    }

    function calGst(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.cost)
        });
        return (sum*0.05);
    }
    function caltoalcost(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.cost)
        });
        return (sum+sum*0.05);
    }



    return (
        <>
            <div>
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
                                        <td>{book.firstname}</td>
                                        <td>{book.lastname}</td>
                                        <td>{book.gender}</td>
                                        <td>{calage(`${book.dob}`)}</td>
                                        <td>₹{book.cost}</td>
                                    </tr>
                                </>
                            ))}
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
                                ₹{caltoalcost(booking)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>

        </>
    );
}

export default Passangerbooking;