import "./privacyPolicy.css";
import CloseIcon from "../../assets/close-Icon.svg"
export default function PrivacyPolicyPage() {
  return (
    <div className="privacyPolicyPage">
      <div className="privacyPolicyTitle">
        <p>الرئيسية / </p> سياسة الخصوصية
      </div>
      <div  className="privacyPolicyHeader">
        <img src={CloseIcon} alt="" />
        <h1>سياسة الخصوصية</h1>

      </div>
    </div>
  );
}
