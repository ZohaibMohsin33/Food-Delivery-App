import React from 'react';

export default function Carousal() {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{"objectFit": "contain !important"}}>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://random-image-pepebigotes.vercel.app/api/random-image/" className="d-block w-100 car-img" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://random-image-pepebigotes.vercel.app/api/random-image/" className="d-block w-100 car-img" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://random-image-pepebigotes.vercel.app/api/random-image/" className="d-block w-100 car-img" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}


