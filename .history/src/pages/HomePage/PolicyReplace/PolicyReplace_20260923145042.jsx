import "./PolicyReplace.css";

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

export default function PolicyReplace() {
  return (
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
  );
}