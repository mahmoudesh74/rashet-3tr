import "./AboutRashetEtr.css";
import storyImgTop from "../../assets/storyImg1.png";
import storyImgBottom from "../../assets/storyImg2.png";
import storyImgAccent from "../../assets/storyImg3.png";
import arrowLeft from "../../assets/arrow-right-02.svg";
import summerIcon from "../../assets/sun-03.svg";
import luxuryIcon from "../../assets/crown-03.svg";
import menIcon from "../../assets/user-02.svg";
import womanIcon from "../../assets/user-circle-02.svg";
import bannerImg from "../../assets/bannerImg.png"
import headsetIcon from "../../assets/customer-support.svg";
import truckIcon from "../../assets/shipping-truck-01.svg";
import layersIcon from "../../assets/kindChose.svg";
import badgeCheckIcon from "../../assets/award-04.svg";

const categories = [
  { id: 1, icon: summerIcon, label: "الصيفية" },
  { id: 2, icon: luxuryIcon, label: "الفاخرة" },
  { id: 3, icon: menIcon, label: "الرجالية" },
  { id: 4, icon: womanIcon, label: "المسائية" },
];

const whyUsItems = [
  {
    id: 1,
    icon: headsetIcon,
    title: "خدمة تهتم بتجربتك",
    desc: "فريق دعم جاهز للإجابة ومساعدتك دائمًا.",
  },
  {
    id: 2,
    icon: truckIcon,
    title: "شحن موثوق",
    desc: "توصيل سريع وآمن إلى جميع مناطق المملكة.",
  },
  {
    id: 3,
    icon: layersIcon,
    title: "اختيارات متنوعة",
    desc: "مئات العطور العالمية تحت سقف واحد.",
  },
  {
    id: 4,
    icon: badgeCheckIcon,
    title: "جودة نثق بها",
    desc: "منتجات أصلية 100% مختارة بعناية.",
  },
];

export default function AboutRashetEtr() {
  return (
    <div className="aboutPage">
     
      <div
        className="aboutHero"
        
      >
       
        <div className="aboutHeroContent">
          <h1>
            رشة عطر...
            <br />
            تفاصيل صغيرة تصنع حضورًا لا يُنسى
          </h1>
          <p>
            نؤمن أن العطر ليس مجرد رائحة،<br /> بل هو بصمة شخصية تسبقك وتبقى بعد
            رحيلك.
          </p>
          <button className="aboutHeroBtn">
            <span>اكتشف عطورنا</span>
            <img src={arrowLeft} alt="" />
          </button>
        </div>
      </div>

      
      <div className="storySection">
         <div className="storyText">
          <div className="storyLabel">
            <span className="storyLine" />
            قصتنا
            <span className="storyLine" />
          </div>
          <h2>رحلة شغف بدأت من حب العطور</h2>
          <p>
            بدأت رشة عطر من شغفنا الحقيقي بعالم العطور، ومن رغبتنا في تقديم
            تجربة مختلفة تجمع بين الجودة والأصالة، واختيار الواسع الذي يلبي
            جميع الأذواق. نحتار كل عطر بعناية ليصبح جزءًا من ذكرياتك اليومية.
          </p>
        </div>
        <div className="storyImages">
          <img src={storyImgTop} alt="" className="storyImgTop" />
          <img src={storyImgBottom} alt="" className="storyImgBottom" />
          <img src={storyImgAccent} alt="" className="storyImgAccent" />
        </div>

       
      </div>

      {/* لكل شخص عطر يشبهه */}
      <div className="categoryBanner">
        <div className="categoryBannerText">
          <h2>لكل شخص عطر يشبهه.</h2>
          <p>اكتشف المجموعة التي تناسبك</p>

          <div className="categoryIcons">
            {categories.map((item) => (
              <div className="categoryIconItem" key={item.id}>
               <div className="categoryIconItemImg">
                 <img src={item.icon} alt="" />
               </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <button className="categoryBannerBtn">
            <span>تسوق الآن</span>
            <img src={arrowLeft} alt="" />
          </button>
        </div>

        <img src={bannerImg} alt="" className="categoryBannerImg" />
      </div>

      {/* لماذا رشة عطر؟ */}
      <div className="whyUsSection">
        <div className="whyUsTitle">
          <span className="whyUsLine" />
          <h2>لماذا رشة عطر؟</h2>
          <span className="whyUsLine" />
        </div>

        <div className="whyUsCards">
          {whyUsItems.map((item) => (
            <div className="whyUsCard" key={item.id}>
              <div className="whyUsIcon">
                <img src={item.icon} alt="" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}