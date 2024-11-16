import React  from 'react';
import './About.css';

function About() {
    return (
        <>
            <main role="main">


                <div className="container about_us">
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-3 ms-5"><b>Let us be your passport to the world.</b></h1>
                            <p> Indiatour strongly believes and follows the concept of Kaizen i.e."change for the better”. It
                                refers
                                to
                                the philosophy of continuous improvement of working practices to provide prompt and quality
                                services
                                with complete guest satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container about_text">

                    <div className="row">
                        <div className="col-md-4">
                            <img src="Images/Vision.png" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            <h2>Vision</h2>
                            <p className="justify">To be the local Travel Management specialist of choice for companies .Our goal is to become a
                                trusted
                                client advisor, a company that can be counted on for insight; a commitment to work with you in
                                developing strategic business plans and tactics designed to give you the best value addition and
                                service , which can be availed of in the travel Industry.
                            </p>

                        </div>
                        <div className="col-md-4">
                            <img src="Images/Mission.png" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            <h2>Mission</h2>
                            <p className="justify">"IndiaTour is passionately committed to Total Quality Travel, with continual delivery of value added
                                services. We uphold the highest ethical standards and believe in creating new benchmarks in the
                                industry."
                            </p>

                        </div>
                        <div className="col-md-4">
                            <img src="Images/Logo_img.svg" className="bd-placeholder-img rounded-circle" width="140" height="140" />
                            <h2>Why Indiatour</h2>
                            <p className="justify">One Line Tour Price, Always All Inclusive. No Additions - No Confusion, No Hidden Costs.
                                No Advertising Gimmicks. No Optional Sightseeing. No Extra Expenses to be paid on tour.
                                Driver and Guide Tip Included in the tour price.
                                Guarantee of 'Carry Zero Money On Tour'.
                                As per the tour category, Best Quality Hotels which are appreciated by traveled guests.
                                Comfortable AC Luxury Coaches, Maximum sightseeing included.
                            </p>
                        </div>
                    </div>

                    <hr />

                </div>

            </main>
        </>
    );
}

export default About;