import { useState, useEffect } from "react";
import "./BestSeller.css";
import arrowRight from "../../assets/arrow-right-02.svg";
import arrowLeft from "../../assets/arrowLeft.svg";

import product1 from "../../assets/download.png";
import product2 from "../../assets/d2.png";
import product3 from "../../assets/d3.png";

const products = [
  {
    id: 1,
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Attar | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product1,
  },
  {
    id: 2,
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Mastry | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product2,
  },
  {
    id: 3,
    kicker: "استمتع بالعطور الفاخرة",
    name: "Acqua Di Gio | عطر رجالي",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product3,
  },
   {
    id: 1,
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Attar | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product1,
  },
  {
    id: 2,
    kicker: "استمتع بالعطور الفاخرة",
    name: "Oud Mastry | عطر عود",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product2,
  },
  {
    id: 3,
    kicker: "استمتع بالعطور الفاخرة",
    name: "Acqua Di Gio | عطر رجالي",
    category: "عطور رجالية",
    oldPrice: 600,
    newPrice: 450,
    image: product3,
  },
];

const AUTOPLAY_DELAY = 1000; // ms between automatic slides

export default function BestSeller() {
  const [current, setCurrent] = useState(0);
  const total = products.length;

  // shortest circular distance from `current` to each card index
  const getOffset = (index) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const goNext = () => setCurrent((prev) => (prev + 1) % total);
  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // autoplay: keeps advancing forever, every AUTOPLAY_DELAY ms, regardless of mouse position
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="BestSeller">
      <div className="BestSellerHeader">
        <div className="BestSellerTitle">
          <h2>الاكثر مبيعا</h2>
          <span className="BestSellerLine"></span>
        </div>
        <div className="pagination">
          <div className="pagination1" onClick={goNext}>
            <img src={arrowRight} alt="arrowRight" />
          </div>
          <div className="pagination2" onClick={goPrev}>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </div>
      </div>

      <div className="BestSellerContent">
        <div className="bs-track">
          {products.map((product, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <div
                key={product.id}
                className={`bs-slide ${isCenter ? "bs-slide-center" : ""}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 340}px) scale(${
                    isCenter ? 1 : 0.85
                  })`,
                  opacity: isVisible ? (isCenter ? 1 : 0.75) : 0,
                  zIndex: isCenter ? 3 : 1,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <div className="bs-card">
                  <div className="bs-card-media">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <button className="bs-fav" aria-label="أضف للمفضلة">
                      ♡
                    </button>
                  </div>
                  <div className="bs-card-body">
                    <span className="bs-kicker">{product.kicker}</span>
                    <h3>{product.name}</h3>
                    <span className="bs-cat">{product.category}</span>
                    <div className="bs-price-row">
                      <span className="bs-price-old">{product.oldPrice} ﷼</span>
                      <span className="bs-price-new">{product.newPrice} ﷼</span>
                    </div>
                    <button className="bs-add-btn">أضف إلى السلة 🛒</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}