// import React from 'react';

import React, { useEffect, useState } from 'react'

import img1 from "../assets/banner/img1.webp"
import img2 from "../assets/banner/img2.webp"
import img3 from "../assets/banner/img3.jpg"
import img5 from "../assets/banner/img5.webp"

export default function Slider() {
  return (
    <div id="carouselExample" className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="d-block w-100" alt="Slide 1" style={{ height: '360px', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img src={img2} className="d-block w-100" alt="Slide 2" style={{ height: '360px', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img src={img3} className="d-block w-100" alt="Slide 3" style={{ height: '360px', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img src={img5} className="d-block w-100" alt="Slide 3" style={{ height: '360px', objectFit: 'cover' }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
