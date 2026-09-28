import { useState } from "react";
import arrowLeft from "../../assets/arrowLeft.svg";
import "./latestArticles.css";
import articlesImg from "../../assets/articles1.jpg";
import articlesImg1 from "../../assets/articles.png";
import arrowRight from "../../assets/arrowLeftArticle.svg";
import arrowlft from "../../assets/arrowRight-b-s.svg";
import arrowright from "../../assets/arrow-right-03.svg"

const ARTICLES = [
  {
    id: "how-to-choose-perfume",
    image: articlesImg,
    title: "كيفية اختيار العطر المثالي: دليل كامل",
    excerpt:
        "تعرف على أهم النصائح لاختيار العطر كهدية يحتاج إلى عناية واهتمام بالتفاصيل، تعرف على أفضل النصائح لاختيار عطر يناسب شخصية من تهديه، ويمنحه تجربة عطرية راقية تترك انطباعًا لا يُنسى في كل مناسبة.",

  },
  {
    id: "perfume-as-gift",
    image: articlesImg1,
    title: "كيف تختار عطرًا ليكون هدية مثالية؟",
    excerpt:
           "إيجاد عطر مثالي يتجاوز الأمر رائحة طيبة، بل يتعلق باختيار رائحة تتناسب مع شخصيتك ونمط حياتك وكيمياء جسدك. هذا الدليل المدعوم من الخبراء يشرح أنواع العطور ونغمات الروائح، والنصائح لتحديد عطرك المميز للاستخدام اليومي أو للمناسبات الخاصة.",

  },
  {
    id: "perfume-as-gi",
    image: articlesImg1,
    title: "كيف تختار عطرًا ليكون هدية مثالية؟",
    excerpt:
      "تعرف على أهم النصائح لاختيار العطر كهدية يحتاج إلى عناية واهتمام بالتفاصيل، تعرف على أفضل النصائح لاختيار عطر يناسب شخصية من تهديه، ويمنحه تجربة عطرية راقية تترك انطباعًا لا يُنسى في كل مناسبة.",
  },
];

export default function LatestArticles() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2;

  const maxIndex = Math.max(0, ARTICLES.length - visibleCount);

  const goPrev = () =>
    setStartIndex((i) => (i <= 0 ? maxIndex : i - 1));

  const goNext = () =>
    setStartIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const visibleArticles = ARTICLES.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="latestArticles">
      <div className="latestArticlesHead">
        <div className="latestArticlesTitle">
          <h2>أحدث المقالات</h2>
          <span className="latestArticlesLine"></span>
        </div>

        <div className="latestArticlesButton" style={{ cursor: "pointer" }}>
          <p>عرض الكل</p>
          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </div>
      </div>

      <div className="latestArticlesBody">
        <button
          type="button"
          className="latestArticlesNavBtn latestArticlesNavBtn--prev"
          onClick={goPrev}
          aria-label="السابق"
        >
          <img src={arrowRight} alt="" />
        </button>

        <div className="latestArticlesGrid">
          {visibleArticles.map((article) => (
            <article className="latestArticlesCard" key={article.id}>
              <div className="latestArticlesImage">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="latestArticlesContent">
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>

                <button type="button" className="latestArticlesReadMore">
                  اقرأ المزيد
                  <img src={arrowright} alt="" />

                </button>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="latestArticlesNavBtn latestArticlesNavBtn--next"
          onClick={goNext}
          aria-label="التالي"
        >
          <img src={arrowlft} alt="" />
        </button>
      </div>
    </div>
  );
}
