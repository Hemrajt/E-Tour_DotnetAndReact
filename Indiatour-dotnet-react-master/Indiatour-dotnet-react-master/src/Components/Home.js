import './Home.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Carousel1 from './Carousel';
import Search from './Search';
import Album from './Album';
import Marque from './Marque';
import React from 'react';

function Home(props) {

    const [tour, setTours] = useState([]);
    let URL_STRING="https://localhost:44381/api"
    useEffect(() => {
        fetch(`${URL_STRING}/sectors`)
            .then(res => res.json())
            .then((result) => { setTours(result); }
            );
    }, []);

    const newtour=tour.filter(tours=>{ return tours.Subsector_Id == ""})

    return (
        <div>
            <Carousel1 />
            <Marque />
            <Search />
            <Album />
            {/* breadcrumb */}
            <div className="container mt-2">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                    </ol>
                </nav>
            </div>
            {/* Main */}

            <div>
                <main>
                    <div className="album py-5 bg-light">
                        <div className="container">

                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {
                                    newtour.map(tor => (
                                        <div className="col" key={tor.Sectormaster_Id}>
                                            <div className="card shadow-sm album_img">
                                                <Link to={tor.Sector_Id}><img src={tor.Imgpath}
                                                    className="img-fluid rounded-2 img_all" /></Link>
                                                <div className="card-body">
                                                    <p className="Album_text">{tor.Sectorname}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Link to={tor.Sector_Id}>
                                                            <Button className="btn btn-info album_btn" type="submit">View More</Button>
                                                        </Link>
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
        </div>
    );
}

export default Home;