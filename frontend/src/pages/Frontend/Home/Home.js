import React, { useEffect, useState } from 'react';
import Card from '../../Components/Card';
import axios from 'axios';

export default function Home() {

  useEffect(() => {
    loadData();
  }, [])

  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState("");



  const loadData = async () => {
    const response = axios.post("http://localhost:8000/api/displaydata");
    setFoodItem((await response).data.data[0]);
    setFoodCat((await response).data.data[1]);
  }

  return (
    <div className="container-fluid"> {/* Added a container class for layout */}
      <div className="row"> {/* Use row class to structure elements */}
        <div className="col-12 p-0"> {/* Full width column for Carousal */}
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-…" className="d-block w-100 car-img" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg" className="d-block w-100 car-img" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://media.istockphoto.com/photos/spicy-paneer-or-chilli-paneer-or-…" className="d-block w-100 car-img" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                
                  </div>
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
        </div>
        {foodCat.length > 0 ?
          foodCat.map((data, index) => {
            return (
              <>
                <div className="col-12 mt-4" key={index}>
                  <h3>{data.CategoryName}</h3>
                </div>
                <hr />
                <div className="col-12 mt-2">
                  <div className="row"> {/* Added a row inside the col-12 */}
                    {foodItem.length > 0 ? (
                      foodItem
                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                        .map((result, resultIndex) => (
                          <div className="col-md-4" key={resultIndex}> {/* Use Bootstrap columns for equal width */}
                            <Card {...result} />
                          </div>
                        ))
                    ) : (
                      <p>No data found</p>
                    )}
                  </div>
                </div>

              </>
            )
          }) :
          <div className='col-12 mt-4'>No food Categories</div>
        }

      </div>
    </div>
  );
}
