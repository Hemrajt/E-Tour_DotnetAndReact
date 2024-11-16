import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/esm/Button';


function Admin(){

    let URL_STRING="https://localhost:44381/api"
    const [booking, setBooking] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/bookingtour/getallcanceltour`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );

    }, []);

    const handledelete = (bookingid) => {
        fetch(`${URL_STRING}/bookings/${bookingid}`, {
            method: 'Delete'
        })
            .then(res => res.json())
            .then((result) => {
                setBooking(result);
            });
            alert("Sucessfully Cancel booking");
            refreshpage();
            
    }
    function refreshpage(){
        window.location.reload(false);
    }
    const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/tourpackages`)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);
    const res = pack.filter(el => {
        return booking.find(element => {
            return element.Package_Id === el.Package_Id;
        });
    });

    return(
            <div className="container">
                <div className="row">
                    <div>
                    <h2 className="text-warning mt-4">Customer Bookings for cancellation</h2>
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
                                        <th scope="col">Request to Cancel Tours</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {booking.map((book, i) => (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{book.Booking_Id}</td>
                                                {res.filter((tor) => tor.Package_Id === book.Package_Id).map((pkg) => (
                                                    <td>{pkg.Package_Name}</td>
                                                ))}
                                                <td>{book.Passangers}</td>
                                                <td>{book.Bookingdate}</td>
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
                                                </Button></td>
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

}

export default Admin;