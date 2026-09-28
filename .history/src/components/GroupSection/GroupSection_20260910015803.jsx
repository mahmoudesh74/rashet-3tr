import arrowLeft from "../../assets/arrowLeft.svg";
import "./GroupSection.css";
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
            <img src={arrowLeft} alt="starIcon" />
          </div>
        </div>
      </div>
      <div className="GroupSectionContent row">
        <div className="GroupSectionItem1 col">
fyxhjcvguhlvhkh

        </div>
         <div className="GroupSectionItem2 col">


        </div>
         <div className="GroupSectionItem3 col">


        </div>

      </div>
    </div>
  );
}
