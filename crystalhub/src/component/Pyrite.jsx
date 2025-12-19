import React from "react";
import "../style/Pyrite.css";

import healing from "../assets/healingstone.jpg";
import bracelet from "../assets/bracelet.jpg";
import pendant from "../assets/pendant.jpg";
import ring from "../assets/ring.jpg";
import tree from "../assets/tree.jpg";
import showpiece from "../assets/showpiece.jpg";
import sage from "../assets/sage.jpg";
import amethyst from "../assets/amethyst.jpg";

const categories = [
  { name: "HEALING CRYSTALS", img: healing },
  { name: "CRYSTAL BRACELETS", img: bracelet },
  { name: "PENDANTS", img: pendant },
  { name: "RINGS", img: ring },
  { name: "CRYSTAL TREES", img: tree },
  { name: "SHOWPIECES", img: showpiece },
  { name: "SAGE", img: sage },
  { name: "AMETHYST", img: amethyst }
];

export default function Pyrite() {
  return (
    <div className="category-wrapper mt-5">  
      {/* <h2 className="text-center">Pyrite</h2> */}

      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
