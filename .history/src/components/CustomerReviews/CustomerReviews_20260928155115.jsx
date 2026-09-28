import "./customerReviews.css";

import star from "../../assets/rattingIcon.svg";
import emptyStartIcon from "../../assets/emptyStarIcon.svg";


const SUMMARY = {
  average: 4.8,
  total: 128,
  distribution: [
    { stars: 5, count: 92 },
    { stars: 4, count: 24 },
    { stars: 3, count: 8 },
    { stars: 2, count: 3 },
    { stars: 1, count: 1 },
  ],
};

const REVIEWS = [
  {
    id: 1,
    name: "محمد السبيعي",
    date: "10 مايو 2025",
    rating: 5,
    title: "تجربة ممتازة",
    text: "استخدمته يوم كامل والثبات ممتاز على الملابس والبشرة. سأعيد شراءه بالتأكيد.",
    avatar: "", 
  },
  {
    id: 2,
    name: "نورة الحربي",
    date: "5 مايو 2025",
    rating: 5,
    title: "عطر مميز وفواح",
    text: "العطر راقي جداً ومناسب للمناسبات والسهرات. التغليف كان أنيق والطلب وصل سريع.",
    avatar: "",
  },
  {
    id: 3,
    name: "عبد الله العتيبي",
    date: "15 مايو 2025",
    rating: 5,
    title: "رائحة فخمة وثبات عالي",
    text: "من أجمل العطور اللي جربتها. ثباته عالي وفوحانه مميز. أنصح به جداً.",
    avatar: "",
  },
];

function Stars({ rating, size = 14 }) {
  const rounded = Math.round(rating);
  return (
    <div className="cr-stars" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={i < rounded ? star : emptyStartIcon}
          alt=""
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews({ hideHeading = false }) {
  return (
    <section
      className={`cr-section${hideHeading ? " cr-section--inline" : ""}`}
      id="reviews"
    >
      {!hideHeading && (
        <div className="cr-heading">
          <h2>تقييمات العملاء</h2>
          <span className="cr-heading-line"></span>
        </div>
      )}

      <div className="cr-layout">
        {/* Summary */}
        <div className="cr-summary">
          <div className="cr-average">
            <span className="cr-average-value">{SUMMARY.average}</span>
            <span className="cr-average-of">من 5</span>
          </div>
          <Stars rating={SUMMARY.average} size={22} />
          <span className="cr-total">{SUMMARY.total} تقييم</span>

          <div className="cr-bars">
            {SUMMARY.distribution.map((row) => (
              <div className="cr-bar-row" key={row.stars}>
                <span className="cr-bar-label">{row.stars} نجوم</span>
                <div className="cr-bar-track">
                  <div
                    className="cr-bar-fill"
                    style={{ width: `${(row.count / SUMMARY.total) * 100}%` }}
                  ></div>
                </div>
                <span className="cr-bar-count">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="cr-cards">
          {REVIEWS.map((review) => (
            <article className="cr-card" key={review.id}>
              <div className="cr-avatar">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} />
                ) : (
                  <span>{review.name.charAt(0)}</span>
                )}
              </div>

              <h3 className="cr-name">{review.name}</h3>
              <span className="cr-date">{review.date}</span>
              <Stars rating={review.rating} size={13} />
              <h4 className="cr-title">{review.title}</h4>
              <p className="cr-text">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
