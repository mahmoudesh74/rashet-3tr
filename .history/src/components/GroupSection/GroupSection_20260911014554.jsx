
import { useState, useEffect } from "react";

import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrow-right-02.svg";

import groupImg1 from "../../assets/groupImg1.png";
import groupImg2 from "../../assets/groupImg2.png";
import groupImg3 from "../../assets/groupImg3.png";
import groupImg4 from "../../assets/groupImg3.png";
import groupImg5 from "../../assets/groupImg1.png";
import groupImg6 from "../../assets/groupImg2.png";

import "./GroupSection.css";

const groups = [
  {
    id: 1,
    img: groupImg1,
    title: "المجموعه الكامله",
    desc: "عطورك المفضلة في مكان واحد",
  },
  {
    id: 2,
    img: groupImg2,
    title: "عطور نسائيه",
    desc: "تزيدك انوثة",
  },
  {
    id: 3,
    img: groupImg3,
    title: "عطور رجالية",
    desc: "تليق فيك",
  },
  {
    id: 4,
    img: groupImg4,
    title: "عطور فاخرة",
    desc: "تجربة استثنائية",
  },
  {
    id: 5,
    img: groupImg5,
    title: "عطور موسمية",
    desc: "للمناسبات الخاصة",
  },
  {
    id: 6,
    img: groupImg6,
    title: "مجموعة الصيف",
    desc: "تحسسك بالانتعاش",
  },
];

const CARD_WIDTH = 360;
const GAP = 30;
const STEP = CARD_WIDTH + GAP;

const TOTAL = groups.length;

const STEP_INTERVAL = 3000;
const TRANSITION_DURATION = 600;

// نكرر الـ groups عشان نعمل infinite loop
const extendedGroups = [...groups, ...groups];

export default function GroupSection() {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // وصلنا لأول نسخة مكررة
    if (index === TOTAL) {
      const timeout = setTimeout(() => {
        // نرجع للبداية بدون Animation
        setWithTransition(false);
        setIndex(0);

        // وبعد الرجوع نرجع الـ Animation تاني
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, TRANSITION_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="GroupSection">
      {/* Header */}
      <div className="GroupSectionHeader">
        <div className="GroupSectionTitle">
          <h2>تسوق حسب المجموعة</h2>
          <p>وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
        </div>

        <div className="GroupSectionButton">
          <p>عرض الكل</p>

          <div className="GroupSectionArrow">
            <img src={arrowLeft} alt="arrow left" />
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="GroupSectionCarouselWrapper">
        <div
          className="GroupSectionCarouselTrack"
          style={{
            transform: `translateX(-${index * STEP}px)`,
            transition: withTransition
              ? `transform ${TRANSITION_DURATION}ms ease-in-out`
              : "none",
          }}
        >
          {extendedGroups.map((group, i) => (
            <div
              key={`${group.id}-${i}`}
              className="GroupCard"
              style={{
                backgroundImage: `url(${group.img})`,
              }}
            >
              <div className="GroupCardContent">
                <h2>{group.title}</h2>

                <p>{group.desc}</p>

                <button className="GroupSectionItemButton">
                  <span>تسوق الان</span>

                  <img
                    src={arrowRight}
                    alt="arrow right"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

