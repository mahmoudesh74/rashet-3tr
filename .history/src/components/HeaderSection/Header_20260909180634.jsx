import "./Header.css";
import starIcon from "../../assets/star.svg";
import truckDelivery from "../../assets/truck-delivery.svg";
import securityCheck from "../../assets/security-check.svg";
import Gift from "../../assets/gift.svg";
import arrowRight from "../../assets/arrow-right-02.svg";
export default function Header() {
  return (
    <div className="HeaderSection">
      <div className="HeaderContent">
        <h2>رشه واحده....</h2>
        <h2>ستترك أثرًا لا يُنسى</h2>
        <p>اكتشف عالمًا من العطور الفاخرة المصممة خصيصًا لك</p>
        <button 
        >اكتشف المجموعات
       < img src={arrowRight} alt="starIcon" />

        </button>
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
              <p>شحن سريع</p>
              <p> توصيل خلال ايام</p>
            </div>
            <div className="HeaderBottomContentItemStarIcon">
              <img src={truckDelivery} alt="starIcon" />
            </div>
          </div>
        </div>
        <div className="HeaderBottomContent">
          <div className="HeaderBottomContentItem">
            <div className="HeaderBottomContentItemText">
              <p>دفع امن</p>
              <p>خيارات دفع متعدده</p>
            </div>
            <div className="HeaderBottomContentItemStarIcon">
              <img src={securityCheck} alt="starIcon" />
            </div>
          </div>
        </div>
        <div className="HeaderBottomContent">
          <div className="HeaderBottomContentItem">
            <div className="HeaderBottomContentItemText">
              <p>شحن مجاني للطلبات </p>
              <p> فوق 199 ريال</p>
            </div>
            <div className="HeaderBottomContentItemStarIcon">
              <img src={Gift} alt="starIcon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
