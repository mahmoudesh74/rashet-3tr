import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrow-right-02.svg";
import groupImg1 from "../../assets/groupImg1.png";
import groupImg2 from "../../assets/groupImg2.png";
import groupImg3 from "../../assets/groupImg3.png";
import groupImg4 from "../../assets/groupImg4.png";
import groupImg5 from "../../assets/groupImg5.png";
import "./GroupSection.css";

const groups = [
  { id: 1, img: groupImg1, title: "المجموعه الكامله", desc: "عطورك المفضلة في مكان واحد" },
  { id: 2, img: groupImg2, title: "عطور نسائيه", desc: "تزيدك انوثة" },
  { id: 3, img: groupImg3, title: "عطور رجالية", desc: "تليق فيك" },
  { id: 4, img: groupImg4, title: "عطور فاخرة", desc: "تجربة استثنائية" },
  { id: 5, img: groupImg5, title: "عطور موسمية", desc: "للمناسبات الخاصة" },
];

export default function GroupSection() {
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
        <div className="GroupSectionCarouselTrack">
          {groups.map((group) => (
            <div
              key={`a-${group.id}`}
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
          {groups.map((group) => (
            <div
              key={`b-${group.id}`}
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