import "./NewsletterSection.css";
import newsletterImage from "../../assets/newsletterImage.png";

export default function NewsletterSection({
  onSubscribe = () => {},
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    onSubscribe(email);
  };

  return (
    <section className="newsletter-section">
      {/* --- هنا الـ "Mask" --- */}
      {/* الكونتينر ده عنده border-radius + overflow:hidden،
          فأي حاجة جواه (الصورة) بتتقص على شكله تلقائيًا،
          بالظبط زي الـ Mask في فيجما */}
      <div className="newsletter-section__image-wrap">
        <img
          src={newsletterImage}
          alt=""
          className="newsletter-section__image"
        />
        {/* طبقة تظليل بنية فوق الصورة عشان النص يبان واضح */}
        <div className="newsletter-section__overlay" />
      </div>

      <div className="newsletter-section__content">
        <h2>كن أول من يعرف</h2>
        <p>
          اشترك في نشرتنا البريدية للحصول على عروض حصرية واكتشاف أحدث
          إضافاتنا من العطور الفاخرة.
        </p>

        <form className="newsletter-section__form" onSubmit={handleSubmit}>
          <button type="submit" className="newsletter-section__btn">
            اشترك الآن
          </button>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            required
            className="newsletter-section__input"
          />
        </form>
      </div>
    </section>
  );
}
