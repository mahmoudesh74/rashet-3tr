import arrowLeft from "../../assets/icons/arrowLeft.svg";

export default function GroupSection() {
  return (
    <div className="GroupSection">
        <div className="GroupSectionHeader">
            <div className="GroupSectionTitle">
                <h2>تسوق حسب المجموعة</h2>
                <p>وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
            </div>
            <div className="GroupSectionButton">
                <div > <img src={arrowLeft} alt="starIcon" /> </div>
                    عرض الكل</div>
            </div>
</div>
    </div>
  )
}
