
import './Marque.css';
import { Link } from "react-router-dom";
import React, { Component }  from 'react';
function Marque(){
    return(
        <div className="container-fluid">
    <div className="ticker">
        <div className="title">
            <h5 className="mt-3">OFFERS</h5>
        </div>
        <div className="news">
            <marquee className="news-content" scrollamount="7">
                <p> Explore Dubai With Us with Our special Dubai Expo Tour Book now and Get 10% Discount <Link to="/details/18"><i>click here</i></Link></p>
                <p>Book Early Tour for ICC T-20 WORLD CUP with 15% Discount<Link to="/details/54"><i>click here</i></Link></p>
                <p>Book a Group Tour for STATUE OF UNITY WITH AHMEDABAD with 10% Discount <Link to="/Details/40 "><i>click here</i></Link></p>
            </marquee>
        </div>
    </div>
</div> 
    );
}

export default Marque;