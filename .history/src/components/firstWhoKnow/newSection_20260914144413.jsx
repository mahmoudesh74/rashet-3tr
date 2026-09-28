

export default function newFirstWhoKnow() {
    
  return (
    <div className="firstWhoKnow">
     <div className="firstWhoKnowContent">
 
        <h2>كن أول من يعرف</h2>
        <p>
          اشترك في نشرتنا البريدية للحصول على عروض حصرية واكتشاف أحدث
          إضافاتنا من العطور الفاخرة.
        </p>

        <form className="newsletter-section__form" >
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
     <div className="firstWhoKnowImg">


     </div>
        </div>
  )
}
