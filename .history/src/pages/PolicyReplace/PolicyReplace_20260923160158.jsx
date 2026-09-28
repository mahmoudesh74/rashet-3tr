import "./PolicyReplace.css";
import searchDamage from "../../assets/SearchDamage.svg";
import contact from "../../assets/contact.svg";
import sendData from "../../assets/sendDataIcon.svg";
import receive from "../../assets/reciveRequest.svg";
import arrowLeft from "../../assets/arrowLeft-p-r.svg"
import refundIcon from "../../assets/refundIcon.svg";
import exchangeIcon from "../../assets/exchangeIcon.svg";
import returnIcon from "../../assets/returnIcon.svg";
import policyReplaceImg from "../../assets/policyReplaceImg.png";

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
  { id: 1, icon: searchDamage, label: "مراجعة الحالة" },
  { id: 2, icon: sendData, label: "إرسال البيانات" },
  { id: 3, icon: contact, label: "تواصل معنا" },
  { id: 4, icon: receive, label: "استلام الطلب" },
];

const infoCardsItems = [
  {
    id: 1,
    icon: refundIcon,
    title: "طريقة الاسترداد",
    desc: "بنفس وسيلة الدفع الأصلية",
  },
  {
    id: 2,
    icon: exchangeIcon,
    title: "مدة الاستبدال",
    desc: "خلال 7 أيام من تاريخ الاستلام",
  },
  {
    id: 3,
    icon: returnIcon,
    title: "مدة الاسترجاع",
    desc: "خلال 3 أيام من تاريخ الاستلام",
  },
];

export default function PolicyReplace() {
  return (
    <div className="policyReplacePage">
      {/* الهيدر الرئيسي */}
      <div className="pageHeaderContent">
        <div className="policyReplaceTitle">
          <p>سياسة الاسترجاع والاستبدال / </p> الرئيسية
        </div>
        <h1>سياسة الاسترجاع والاستبدال</h1>
        <p className="pageHeaderDesc">
          نحرص في رشة عطر على أن تكون تجربتك معنا واضحة ومريحة. نلتزم بتقديم
          أفضل خدمة لعملائنا الكرام.
        </p>
        <img
          src={policyReplaceImg}
          alt=""
          className="policyReplaceImg"
        />
      </div>

      {/* كارت المعلومات الثلاثي */}
      <div className="infoCards">
        {infoCardsItems.map((item) => (
          <div className="infoCard" key={item.id}>
            <img src={item.icon} alt="" className="infoCardIcon" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

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
            <span className="policyTermsBar" /> شروط الاسترجاع
          </h2>
          <ul>
            {termsItems.map((item) => (
              <li key={item.id}>
                <span className="termNumber">{item.id}</span>

                <p>{item.text}</p>
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
                <div className="flowIcon">
                  <img src={step.icon} alt="" />
                </div>
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