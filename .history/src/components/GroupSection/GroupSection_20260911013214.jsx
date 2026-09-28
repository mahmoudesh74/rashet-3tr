import { useState, useEffect, useRef } from "react";
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
  { id: 1, img: groupImg1, title: "المجموعه الكامله", desc: "عطورك المفضلة في مكان واحد" },
  { id: 2, img: groupImg2, title: "عطور نسائيه", desc: "تزيدك انوثة" },
  { id: 3, img: groupImg3, title: "عطور رجالية", desc: "تليق فيك" },
  { id: 4, img: groupImg4, title: "عطور فاخرة", desc: "تجربة استثنائية" },
  { id: 5, img: groupImg5, title: "عطور موسمية", desc: "للمناسبات الخاصة" },
  { id: 6, img: groupImg6, title: "مجموعة الصيف", desc: "تحسسك بالانتعاش" },
];

const CARD_WIDTH = 360;
const GAP = 30;
const STEP = CARD_WIDTH + GAP;
const TOTAL = groups.length;
const STEP_INTERVAL = 3000;      // كل قد ايه بتتحرك خطوة (3 ثواني)
const TRANSITION_DURATION = 600; // مدة حركة الخطوة نفسها

export default function GroupSection() {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const timeoutRef = useRef(null);

  // بنكرر الصور مرتين عشان نلاقي دايمًا محتوى جاهز نكمل بيه الدورة من غير قفلة
  const extendedGroups = [...groups, ...groups];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, STEP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === TOTAL) {
      timeoutRef.current = setTimeout(() => {
        setWithTransition(false); // نرجع للبداية بدون أنيميشن عشان اليوزر ميحسش بقفزة
        setIndex(0);
      }, TRANSITION_DURATION);
    } else {
      setWithTransition(true);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="GroupSection">
      <div className="GroupSectionHeader">
        <div className="GroupSectionTitle">
          <h2>تسوق حسب المجموعة</h2>
          <p>وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
        </div>
        <div className="GroupSectionButton">
          <p>عرض الكل</p>
          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </div>
      </div>

      <div className="GroupSectionCarouselWrapper">
        <div
          className="GroupSectionCarouselTrack"
          style={{
            transform: `translateX(-${index * STEP}px)`,
            transition: withTransition
              ? `transform ${TRANSITION_DURATION}ms ease`
              : "none",
          }}
        >
          {extendedGroups.map((group, i) => (
            <div
              key={i}
              className="GroupCard"
              style={{ backgroundImage: `url(${group.img})` }}
            >
              <h2>{group.title}</h2>
              <p>{group.desc}</p>
              <button className="GroupSectionItemButton">
                <p>تسوق الان</p>
                <img src={arrowRight} alt="arrowRight" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}