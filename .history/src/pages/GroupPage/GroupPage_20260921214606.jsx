import "./GroupPage.css"
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
