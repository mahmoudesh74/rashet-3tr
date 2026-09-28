import { useState, useEffect } from "react";
import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrow-right-02.svg";
import groupImg1 from "../../assets/groupImg1.png";
import groupImg2 from "../../assets/groupImg2.png";
import groupImg3 from "../../assets/groupImg3.png";
import groupImg4 from "../../assets/groupImg4.png";
import groupImg5 from "../../assets/groupImg5.png";
import groupImg6 from "../../assets/groupImg6.png";
import "./GroupSection.css";

const groups = [
  {
    id: 1,
    image: groupImg1,
    title: "المجموعه الكامله",
    desc: "عطورك المفضلة في مكان واحد",
  },
  {
    id: 2,
    image: groupImg2,
    title: "عطور نسائيه",
    desc: "تزيدك انوثة",
  },
  {
    id: 3,
    image: groupImg3,
    title: "عطور رجالية",
    desc: "تليق فيك",
  },
   {
    id: 4,
    image: groupImg4,
    title: "عطور رجالية",
    desc: "تليق فيك",
  },
   {
    id: 5,
    image: groupImg5,
    title: "عطور رجالية",
    desc: "تليق فيك",
  },
   {
    id: 6,
    image: groupImg6,
    title: "عطور رجالية",
    desc: "تليق فيك",
  },
  
];

const AUTOPLAY_DELAY = 2000;

export default function GroupSection() {
  const [current, setCurrent] = useState(0);
  const total = groups.length;

  const getOffset = (index) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const goNext = () => setCurrent((prev) => (prev + 1) % total);
 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev - 1 + total) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="GroupSection">
      <div className="GroupSectionHeader">
        <div className="GroupSectionTitle">
          <h2>تسوق حسب المجموعة</h2>
          <p>وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
        </div>
        <div className="GroupSectionButton" onClick={goNext} style={{ cursor: "pointer" }}>
          <p>عرض الكل</p>
          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </div>
      </div>

      <div className="GroupSectionContent">
        <div className="gs-track">
          {groups.map((group, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <div
                key={group.id}
                className={`gs-slide ${isCenter ? "gs-slide-center" : ""}`}
                style={{
                  transform: `translateX(-50%) translateX(${offset * 420}px)`,
                 opacity: isVisible ? 1 : 0,
                  zIndex: isCenter ? 6 : 1,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <div
                  className="gs-card"
                  style={{
                    backgroundImage: `linear-gradient(270deg, rgba(0,0,0,0.6) 41.35%, rgba(0,0,0,0) 100%), url(${group.image})`,
                  }}
                >
                  <h2>{group.title}</h2>
                  <p>{group.desc}</p>
                  <button className="GroupSectionItemButton">
                    <p>تسوق الان</p>
                    <img src={arrowRight} alt="arrowRight" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}