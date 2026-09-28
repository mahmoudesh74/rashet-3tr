import "./privacyPolicy.css";
import CloseIcon from "../../assets/close-Icon.svg";
import privacy from "../../assets/privacy.png";
import database from "../../assets/database.svg"
export default function PrivacyPolicyPage() {
  return (
    <div className="privacyPolicyPage">
      <div className="pageHeaderContent">
        <div className="privacyPolicyTitle">
          <p>الرئيسية / </p> سياسة الخصوصية
        </div>
        <div className="privacyPolicyHeader">
          <div className="privacyPolicyHeaderImg">
            <img src={CloseIcon} alt="" />
            <h1>سياسة الخصوصية</h1>
          </div>
          <div className="privacyPolicyHeaderDes">
            <p>
              نحن في رشة عطر نقدر ثقتكم بنا. توضح هذه السياسة كيف نجمع بياناتك
              ونستخدمها ونحميها بأعلى معايير الأمان المتبعة في المملكة العربية
              السعودية.
            </p>
          </div>
        </div>
        <img src={privacy} alt="" className="headerShieldImg" />
      </div>
      <div className="introSection">
        <h2>مقدمه</h2>
        <p>
          تطبق هذه السياسة على جميع الخدمات التي يقدمها متجرنا الإلكتروني، وتوضح
          أنواع المعلومات التي نجمعها، وكيفية معالجتها، والتدابير التي نتخذها
          لضمان أمنها.آخر تحديث: 24 أكتوبر 2024. تم إعداد هذه السياسة لتتوافق مع
          نظام حماية البيانات الشخصية في المملكة العربية السعودية. <br /> عند استخدامك
          لموقع وتطبيق "رشة عطر"، فإنك توافق على ممارسات جمع البيانات الموضحة
          هنا.
        </p>
      </div>
      <div className="dataCollected">
        <div className="Database">
          <div className="DatabaseImg">
          <img src={database} alt="" />

          </div>
         <div className="DatabaseDes"> <h2>ما البيانات التي نجمعها؟</h2></div>
        </div>
      </div>
    </div>
  );
}
