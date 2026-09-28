import "./firstWhoKnow.css"
import mail from "../../assets/mail.svg"
export default function FirstWhoKnow() {
    
  return (
    <div className="firstWhoKnow">
     <div className="firstWhoKnowContent">
 
        <h2>كن أول من يعرف</h2>
       <div className="firstWhoKnowContentText">
         <p>
          اشترك في نشرتنا البريدية للحصول على عروض حصرية واكتشاف أحدث
          إضافاتنا من العطور الفاخرة.
        </p>
       </div>

       <form className="newsletter-section__form">
  <div className="newsletter-section__input-wrap">
    <img src={mail} alt="" className="mailIcon" />
    <input
      type="email"
      name="email"
      placeholder="example@email.com"
      required
      className="newsletter-section__input"
    />
  </div>
  <button type="submit" className="newsletter-section__btn">
    اشترك الآن
  </button>
</form>
      

     </div>
     <div className="firstWhoKnowImg">


     </div>
        </div>
  )
}
