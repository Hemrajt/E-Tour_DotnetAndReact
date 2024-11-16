import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React  from 'react';


function Cost() {

    const [cost, setCost] = useState([]);
    const { SSid } = useParams();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/costs/${SSid}`)
            .then(res => res.json())
            .then((result) => { setCost(result); }
            );
    }, []);


    return (
        <>
            <div id="Cost">
                <h3>Tour Detailed Price</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Deal Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cost.map(cst => (
                            <>
                            <tr key={cst.Cost_Id}>
                                <th scope="row">1</th>
                                <td>Single Occupancy</td>
                                <td>₹{cst.Singleoccupancy}</td>
                            </tr>
                        

                         <tr>
                            <th scope="row">2</th>
                            <td>Twin Sharing</td>
                            <td>₹{cst.Twinperson}</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Triple Sharing</td>
                            <td>₹{cst.Triplesharing}</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Child With Bed</td>
                            <td>₹{cst.Childwithparents}</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Child Without Bed</td>
                            <td>₹{cst.Childwithoutparents}</td>
                        </tr> 
                        </>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        </>

    );
}

export default Cost;