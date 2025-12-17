import React, { useRef } from "react";
import "../style/RingSlider.css";

import r1 from "../assets/ring1.jpg";
import r2 from "../assets/ring2.jpg";
import r3 from "../assets/ring3.jpg";
import r4 from "../assets/ring4.jpg";

const images = [r1, r2, r3, r4];

export default function RingSlider() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    sliderRef.current.scrollLeft += dir === "left" ? -300 : 300;
  };

  return (
    <div className="ring-slider-wrapper">
      <div className="ring-text">
        <h1>STERLING SILVER</h1>
        <h2>RINGS</h2>
        <p>ADJUSTABLE RINGS</p>
      </div>

      <button className="nav left" onClick={() => scroll("left")}>❮</button>

      <div className="ring-slider" ref={sliderRef}>
        {images.map((img, i) => (
          <div className="ring-card" key={i}>
            <img src={img} alt="ring" />
          </div>
        ))}
      </div>

      <button className="nav right" onClick={() => scroll("right")}>❯</button>
    </div>
  );
}
