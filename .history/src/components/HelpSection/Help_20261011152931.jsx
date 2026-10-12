
import "./Help.css";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="Help">
      <div className="HelpContent">
        <h2>هل تحتاج إلى مساعدة إضافية؟</h2>

        <p>
          فريق خدمة عملاء رشة عطر جاهز لمساعدتك
          والإجابة عن جميع استفساراتك المتعلقة
          بكيفية تعاملنا مع بياناتك.
        </p>

        <button
          className="contactUsButton"
          onClick={() => navigate("/contactUs")}
        >
          تواصل معنا
        </button>
      </div>
    </div>
  );
}
