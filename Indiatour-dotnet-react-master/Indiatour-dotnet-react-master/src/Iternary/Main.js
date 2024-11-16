import IterneryCarousel from "./IterneryCarousel";
import Iternery from "./Iternery";
import Cost from "./Cost";
import Information from "./Information";
import { Link } from "react-router-dom";
import BookingDate from "./BookingDate";
import React  from 'react';

function Main() {

   
    return (
        <div>
            {/* <!-- breadcrumb --> */}
            <div className="container mt-2">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">Tour Deatils</li>
                    </ol>
                </nav>
            </div>
            {/* <!--Product page --> */}
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <div>
                            {<IterneryCarousel />}
                        </div>
                        <div>
                            {/* Nav tabs */}
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="Iternery-tab" data-bs-toggle="tab" data-bs-target="#Iternery" type="button" role="tab" aria-controls="Iternery" aria-selected="true">Iternery</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="Cost-tab" data-bs-toggle="tab" data-bs-target="#Cost" type="button" role="tab" aria-controls="Cost" aria-selected="false">Cost</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="Information-tab" data-bs-toggle="tab" data-bs-target="#Information" type="button" role="tab" aria-controls="Information" aria-selected="false">Infromation</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="Map-tab" data-bs-toggle="tab" data-bs-target="#Map" type="button" role="tab" aria-controls="Map" aria-selected="false">MAP</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="Iternery" role="tabpanel" aria-labelledby="Iternery-tab">{<Iternery />}</div>
                                <div className="tab-pane fade" id="Cost" role="tabpanel" aria-labelledby="Cost-tab">{<Cost />}</div>
                                <div className="tab-pane fade" id="Information" role="tabpanel" aria-labelledby="Information-tab">{<Information />}</div>
                                <div className="tab-pane fade" id="Map" role="tabpanel" aria-labelledby="Map-tab">
                                    <>
                                    <h3>Tour Map</h3>
                                    <div className="map-responsive" style={{border: "1 solid yellow"}}>

                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.6509571649!2d54.94755420360507!3d25.075759453986663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1641355984132!5m2!1sen!2sin"
                                            width="964" height="500" style={{border:"0"}} allowfullscreen="" loading="lazy"></iframe>
                                    </div>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                    {<BookingDate/>}
                </div>
            </div>
        </div>
    );
}
export default Main;