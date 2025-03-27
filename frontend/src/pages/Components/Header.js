import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart,useDispatch } from './ContextReducer';
import axios from 'axios';

export default function Header() {
  let data = useCart();
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const finalPrize = data.reduce((total, food) => total + food.price, 0);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleCheckout = async () => {
    console.log(localStorage.getItem("userMail"))
    let response = await axios.post("http://localhost:8000/api/orderdata",{
      email : localStorage.getItem("userMail"),
      order_data : data,
      order_date : new Date().toDateString()
      
    })
    if(response.data.success){
      dispatch({type : "DROP"});
      alert("Added to the database")
    }else{
      alert("Action not performed")
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success navbar-dark">
        <div className="container-fluid">
          {/* Correct Link usage */}
          <Link className="navbar-brand" to="/">GetFood</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              {
                localStorage.getItem("authToken") ?
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/myOrders">My Orders</Link>
                  </li> : ""
              }
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {
                !localStorage.getItem("authToken") ?
                  <>
                    <li className="nav-item mx-3">
                      <button className="btn bg-light text-success mb-0 btn-outline-success" aria-current="page" onClick={() => navigate("/auth/signin")}>Signin</button>
                    </li>
                    <li className="nav-item">
                      <button className="btn bg-light text-success mb-0 btn-outline-success" aria-current="page" onClick={() => navigate("/auth/register")}>Signup</button>
                    </li>
                  </>
                  :
                  <>
                    <li className="nav-item mx-3">
                      <button className="btn bg-light text-success mb-0" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        My Cart
                        <Badge pill className='bg-danger mx-2'>{data.length}</Badge>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="btn bg-light text-danger mb-0" aria-current="page" onClick={handleLogout}>Log Out</button>
                    </li>
                  </>
              }
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cart Items</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {

              (data.length > 0) ?
                <div className="modal-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope='col'>Size</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((food, index) => {
                        return(
                        <tr>
                          <th scope="row">{index+1}</th>
                          <td>{food.name}</td>
                          <td>{food.qty}</td>
                          <td>{food.size}</td>
                          <td>{food.price}</td>
                          <td><button className="btn btn-danger" onClick={()=> dispatch({type:"REMOVE",index:index})}>Delete</button></td>
                        </tr>)

                      })}


                    </tbody>
                  </table>
                </div> :
                <div className='modal-body'>This cart is empty...</div>

            }
            <h3>Total prize : {finalPrize}</h3>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
