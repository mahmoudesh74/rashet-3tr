import "./GroupPage.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrow-right-02.svg";
import groupImg1 from "../../assets/groupImg1.png";
import groupImg2 from "../../assets/groupImg2.png";
import groupImg3 from "../../assets/groupImg3.png";
import groupImg4 from "../../assets/groupImg4.png";
import groupImg5 from "../../assets/groupImg5.png";
import groupImg6 from "../../assets/groupImg6.png";

export default function GroupPage() {
  return (
    <div className="GroupSection">
      <div className="GroupSectionHeader">
        <div className="GroupSectionTitle">
          <h2>تسوق حسب المجموعة</h2>
          <p>وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
        </div>
        <div
          className="GroupSectionButton"
          
          style={{ cursor: "pointer" }}
        >
          <Link to={"/GroupPage"} >عرض الكل</Link>
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
                  transform: `translateX(-50%) translateX(${offset * 480}px)`,
opacity: isVisible ? (isCenter ? 1 : 1) : .75,
                  zIndex: isCenter ? 3 : 1,
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
