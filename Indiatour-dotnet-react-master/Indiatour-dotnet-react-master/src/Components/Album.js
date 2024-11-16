import './Album.css';

function Album(){
    return(
        <div>
        {/*album sector*/}
    <section className="py-5 text-center container" id="Tours">
        <div className="row py-lg-2">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light" style={{fontfamily: "Arial,Helvetica,sans-serif"}}>
                    <b>TOURS WE OFFER</b>
                </h1>
                <p className="lead text-muted">Let us transport you with our highly affordable and reliable holiday
                    packages.
                </p>
            </div>
        </div>
    </section>
    </div>
    );
}

export default Album;