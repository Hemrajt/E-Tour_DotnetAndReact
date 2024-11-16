import '../Components/Home.css';
import React from 'react';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Carousel1 from '../Components/Carousel';
import Search from '../Components/Search';
import Album from '../Components/Album';


function SubSector() {

    let URL_STRING="https://localhost:44381/api"
    const [subtour, setSubtours] = useState([]);
    const { Sid, Id} = useParams();
    useEffect(() => {
        fetch(`${URL_STRING}/sector/get1/${Sid}`)
            .then(res => res.json())
            .then((result) => { setSubtours(result); }
            );
    }, []);

    const [cost, setCost] = useState([]);
    useEffect(() => {
        fetch(`${URL_STRING}/cost/getcost/${Sid}`)
            .then(res => res.json())
            .then((result) => { setCost(result); }
            );
    }, []);

    let count=0;
    function getCost(newcost)
    {
        const array=[0]
        newcost.map(cst=>(
            array.push(cst.Singleoccupancy)
        ))
          if(count===0)
          {
            count++;
            return array[count];
          }
          else{
              count++;
              return array[count];
          }
    }

    return (
        <>        <div>
            <Carousel1 />
            <Search />
            <Album />
            {/* breadcrumb */}
            <div className="container mt-2">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><a href={`/${Id}`}>Sector</a></li>
                        <li className="breadcrumb-item">Subsectors tours</li>
                    </ol>
                </nav>

            </div>
            <main>
                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {subtour.map(stour => (
                                    <div className="col">
                                        <div className="card shadow-sm album_img">
                                        <a href={'/Details/' + stour.Sectormaster_Id} className=""> <img src={stour.Imgpath}
                                                className="img-fluid rounded-2" /></a>
                                            <div className="card-body">
                                                <div>
                                                    <p className="Album_text">{stour.Sectorname}</p>
                                                     <p className="text-center"><b>₹{getCost(cost)}</b></p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {/* <Link to={stour.sectorid}>
                                                        <Button className="btn btn-info album_btn" type="submit">View More</Button>
                                                    </Link> */}
                                                    <a href={'/Details/' + stour.Sectormaster_Id}> <Button className="btn btn-info album_btn" type="submit">View More</Button></a>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>

        </>
    );
}

export default SubSector;