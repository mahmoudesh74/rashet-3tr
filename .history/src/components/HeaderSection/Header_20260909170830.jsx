import "./Header.css";
import starIcon from "../../assets/star.svg";
export default function Header() {
  return (
    <div className="HeaderSection">
      <div className="HeaderContent">
        <h2>رشه واحده....</h2>
        <h2>ستترك أثرًا لا يُنسى</h2>
        <p>اكتشف عالمًا من العطور الفاخرة المصممة خصيصًا لك</p>
      </div>
      <div className="HeaderBottom">
        <div className="HeaderBottomContent">
          <div className="HeaderBottomContentItem">
            <div className="HeaderBottomContentItemText">
                <p>ثبات يدوم طويلا</p>
              <p> تركيز عالي يدوم معك</p>
            </div>
           <div className="HeaderBottomContentItemStarIcon">
            <img src={starIcon} alt="starIcon" />
           </div>
          </div>
        </div>
         <div className="HeaderBottomContent">
          <div className="HeaderBottomContentItem">
            <div className="HeaderBottomContentItemText">
                <p>ثبات يدوم طويلا</p>
              <p> تركيز عالي يدوم معك</p>
            </div>
           <div className="HeaderBottomContentItemStarIcon">
            <img src={starIcon} alt="starIcon" />
           </div>
          </div>
        </div>
        <div className="HeaderBottomContent">
          <div className="HeaderBottomContentItem">
            <div className="HeaderBottomContentItemText">
                <p>ثبات يدوم طويلا</p>
              <p> تركيز عالي يدوم معك</p>
            </div>
           <div className="HeaderBottomContentItemStarIcon">
            <img src={starIcon} alt="starIcon" />
           </div>
          </div>
        </div>
         <div className="HeaderBottomContent">
          <div className="HeaderBottomContentItem">
            <div className="HeaderBottomContentItemText">
                <p>ثبات يدوم طويلا</p>
              <p> تركيز عالي يدوم معك</p>
            </div>
           <div className="HeaderBottomContentItemStarIcon">
            <img src={starIcon} alt="starIcon" />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
