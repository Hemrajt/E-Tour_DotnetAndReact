import './Home.css'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Carousel1 from './Carousel';
import Search from './Search';
import Album from './Album';
import { useNavigate } from "react-router-dom"
import React from 'react';


function Sector() {

    const [tour, setTours] = useState([]);
    const { Id } = useParams();
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/sector/get1/${Id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => { setTours(result); }
            );
    }, []);

   
    function routeChange(a,b,c){

        let path1 = `${b}`;
        let path2 =`/details/${c}`;
        let path=`${a}`;

        if (path==0){
           return path1;
        }
        else{
            return path2;
        }

    }
    

    return (

        <div>
            <Carousel1 />
            <Search />
            <Album />
            {/* breadcrumb */}

            <div className="container mt-2">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">Sectors</li>
                    </ol>
                </nav>
            </div>
            <div>
                <main>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {tour.map(tor => (
                                    <>
                                        <div className="col">
                                            <div className="card shadow-sm album_img">
                                                <Link to={routeChange(`${tor.Flag}`,`${tor.Sector_Id}`,`${tor.Sectormaster_Id}`)} className=""> <img src={tor.Imgpath}
                                                    className="img-fluid rounded-2 img_all" /></Link>
                                                <div className="card-body">
                                                    <p className="Album_text">{tor.Sectorname}</p>
                                                    <div className="d-flex justify-content-between ">

                                                        <Link to={routeChange(`${tor.Flag}`,`${tor.Sector_Id}`,`${tor.Sectormaster_Id}`)}>
                                                            <button className="btn btn-info album_btn" type="submit" >View More</button>
                                                        </Link>

                                                        {/* <form >
                                                            <Button className="btn btn-info album_btn" type="button" onClick={details(`${tor.flag}`,`${tor.sectorid}`,`${tor.sectormasterid}`)} >View More</Button>
                                                        </form>  */}
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>

                </main>


            </div>

        </div>
    );

}

export default Sector;