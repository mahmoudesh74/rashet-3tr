import "./PolicyReplace.css";
import searchDamage from "../../assets/SearchDamage.svg";
import contact from "../../assets/contact.svg";
import sendData from "../../assets/sendDataIcon.svg";
import receive from "../../assets/reciveRequest.svg";

const stepsItems = [
  {
    id: 1,
    title: "تأكد من حالة المنتج",
    desc: "تأكد من أن المنتج مطابق لشروط الاسترجاع المذكورة أدناه.",
    active: true,
  },
  {
    id: 2,
    title: "احتفظ ببيانات طلبك",
    desc: "ستحتاج إلى رقم الطلب والبريد الإلكتروني لإتمام الطلب.",
    active: false,
  },
  {
    id: 3,
    title: "تواصل مع خدمة العملاء",
    desc: "ابدأ طلب الاسترجاع عبر قنوات التواصل المعتمدة.",
    active: false,
  },
  {
    id: 4,
    title: "انتظر تأكيد الطلب",
    desc: "سيتم مراجعة الطلب وإبلاغك بالخطوات التالية فورًا.",
    active: false,
  },
];

const checklistItems = [
  "الغلاف البلاستيكي سليم",
  "فاتورة الشراء متوفرة",
  "جميع الهدايا مرفقة",
];

const termsItems = [
  {
    id: 1,
    text: "أن يكون المنتج بحالته الأصلية ولم يتم فتحه أو استخدامه.",
  },
  {
    id: 2,
    text: "يجب إرجاع كافة الملحقات والعينات المجانية التي تم استلامها مع الطلب.",
  },
  {
    id: 3,
    text: "يتحمل العميل تكاليف الشحن للإرجاع إلا في حالة استلام منتج تالف أو خاطئ.",
  },
];

const flowSteps = [
  { id: 1, icon:searchDamage , label: "مراجعة الحالة" },
  { id: 2, icon: sendData, label: "إرسال البيانات" },
  { id: 3, icon: contact, label: "تواصل معنا" },
  { id: 4, icon: receive, label: "استلام الطلب" },
];

export default function PolicyReplace() {
  return (
    <div className="policyReplacePage">
      {/* الخطوات قبل طلب الاسترجاع */}
      <div className="stepsSection">
        <h2>قبل طلب الاسترجاع</h2>

        <div className="stepsTrack">
          <div className="stepsLine" />
          {stepsItems.map((step) => (
            <div className="stepItem" key={step.id}>
              <div className={`stepCircle ${step.active ? "active" : ""}`}>
                {String(step.id).padStart(2, "0")}
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* شروط الاسترجاع + قائمة التحقق */}
      <div className="policyTermsSection">
        <div className="policyTermsList">
          <h2>
            شروط الاسترجاع <span className="policyTermsBar" />
          </h2>
          <ul>
            {termsItems.map((item) => (
              <li key={item.id}>
                <p>{item.text}</p>
                <span className="termNumber">{item.id}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="checklistCard">
          <h3>
            <span className="checklistHeaderIcon">✓</span> قائمة التحقق قبل
            الإرجاع
          </h3>
          <ul>
            {checklistItems.map((item, index) => (
              <li key={index}>
                <span className="checkIcon">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    
      <div className="damagedProductSection">
        <h2>استلمت منتجًا تالفًا أو غير مطابق؟</h2>
        <p>
          إذا وصلتك الشحنة بحالة غير سليمة أو كان المنتج مختلفًا عن طلبك،
          تواصل مع خدمة العملاء في أسرع وقت مع رقم الطلب والتفاصيل المطلوبة.
        </p>

        <div className="flowRow">
          {flowSteps.map((step, index) => (
            <div className="flowStepWrapper" key={step.id}>
              <div className="flowStep">
                <span>{step.label}</span>
                <img src={step.icon} alt="" className="flowIcon" />
              </div>
              {index < flowSteps.length - 1 && (
                <img src={arrowLeft} alt="" className="flowArrow" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}