import React  from 'react';

function Gallery() {
    return (
        <div>
            {/* album sector */}
          <section className="py-5 text-center container" id="Tours">
        <div className="row py-lg-2">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light" style={{fontfamily: "Arial,Helvetica,sans-serif"}}>
                    <b>Gallery</b>
                </h1>
                <p className="lead text-muted">Our Featured Stories
                </p>
            </div>
        </div>
    </section>
            <div>
                <main>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_1.jpg"
                                            className="img-fluid rounded-2" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_2.jpg"
                                            className="img-fluid rounded-2" />
                                        </a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_3.jpg"
                                            className="img-fluid rounded-2" /></a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_4.jpg"
                                            className="img-fluid rounded-2" /></a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_5.jpg"
                                            className="img-fluid rounded-2" /></a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_6.jpg"
                                            className="img-fluid rounded-2" /></a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img
                                            src="/Images/GAL_7.jpg"
                                            className="img-fluid rounded-2" /></a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_8.jpg"
                                            className="img-fluid rounded-2" />
                                        </a>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm album_img">
                                        <a href="#" className=""> <img src="/Images/GAL_9.jpg"
                                            className="img-fluid rounded-2" />
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>


            </div>
        </div>
    );
}

export default Gallery;