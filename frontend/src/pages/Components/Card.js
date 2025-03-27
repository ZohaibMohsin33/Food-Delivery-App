import React, { useState,useRef, useEffect } from 'react';
import { useCart, useDispatch } from './ContextReducer';

export default function Card({ options, name, img, description, _id }) {

  // Ensure options is an array and contains at least one element before accessing options[0]
  const looper = options && options.length > 0 ? Object.keys(options[0]) : [];

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let priceRef = useRef();
  let dispatch = useDispatch();
  let data = useCart();

  const handleAddToCart = async () => {
    await dispatch({ type: "ADD", id: _id, name, size, qty,price : finalPrize });
    console.log(data);
  }

  let finalPrize = qty * options[0][size];

  useEffect(()=>{
   setSize(priceRef.current.value);
  },[])

  return (
    <div className="card m-3" style={{ "width": "18rem" }}>
      <img src={img} className="card-img-top imager" alt="..." /> {/* Updated class to className */}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>

      <div className="container">
        <select className="m-2 bg-success text-light rounded h-100 w-25" value={qty} onChange={(e) => setQty(e.target.value)}>
          {Array.from(Array(6), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select className="m-2 bg-success text-light rounded h-100 w-25" ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
          {looper.map((val, index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
        <div className="row">
          <div className="col-9">
            <h4>Final Prize : </h4>
          </div>
          <div className="col-3">
            <span> {finalPrize}/-</span>
          </div>
        </div>

        <hr />
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <button className='w-100 btn btn-warning mb-2 text-light' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
