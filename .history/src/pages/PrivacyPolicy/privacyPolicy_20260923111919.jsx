import "./privacyPolicy.css";
import CloseIcon from "../../assets/close-Icon.svg"
export default function PrivacyPolicyPage() {
  return (
    <div className="privacyPolicyPage">
    <div className="pageHeaderContent">
        <div className="privacyPolicyTitle">
        <p>الرئيسية / </p> سياسة الخصوصية
      </div>
      <div className="privacyPolicyHeader">
       <div className="privacyPolicyHeaderImg">
        <h1>سياسة الخصوصية</h1>
       </div>
   <div className="privacyPolicyHeaderDes">
         <p>نحن في رشة عطر نقدر ثقتكم بنا. توضح هذه السياسة كيف نجمع بياناتك ونستخدمها
ونحميها بأعلى معايير الأمان المتبعة في المملكة العربية السعودية.</p>
   </div>
      </div>
      <img src={CloseIcon} alt="" className="headerShieldImg" />
    </div>
    </div>
  );
}
