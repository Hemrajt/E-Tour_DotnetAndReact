import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate,useParams} from 'react-router-dom';
import React  from 'react';
function PassangerTable() {
    
    const [booking, setBooking] = useState([]);
    const { smid, bkid, cid } = useParams();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/passanger/getdetails/${bkid}/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    const handledelete = (passid) => {
        fetch(`${URL_STRING}/passangers/${passid}`, {
            method: 'Delete'
        })
            .then(res => res.json())
            .then((result) => {
                setBooking(result);
            });
            alert("Sucessfully Deleted Passanger");
            refreshpage();
            
    }

    function refreshpage(){

        window.location.reload(false);
    }
    function calage(date1){
        const date2=new Date(date1);
        const today=new Date();
        const date3=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const date4=new Date(date3)
        const diff = Math.ceil(date4 - date2);
        const fin=Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        return((fin))
        ;            
    }
    // let sum=0;
    // function calcost(intialcost){
    //     sum=sum + parseInt(intialcost) 
    //     return(sum
    //     );
    // }

    

    return (
        <>
            <div>
                <div id="Cost">

                    <h2>All Passangers</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Age</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Remove</th>
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
                                        <td><Button className="mt-0 mb-0" variant="danger" type="submit" onClick={() => {
                                            const confirmBox = window.confirm(
                                                "Do you really want to delete this Customer"
                                            )
                                            if (confirmBox === true) {

                                                handledelete(book.Pass_Id);
                                            }
                                        }}>
                                            <i class="bi bi-person-x-fill"></i>
                                            </Button></td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>

        </>
    );
}

export default PassangerTable;