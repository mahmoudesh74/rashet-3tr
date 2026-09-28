import "./privacyPolicy.css";
import CloseIcon from "../../assets/close-Icon.svg";
import privacy from "../../assets/privacy.png";
import database from "../../assets/database.svg";
import { useState } from "react";

const dataCollectedItems = [
  {
    id: 1,
    title: "البيانات الشخصية",
    content: "الاسم، رقم الجوال، البريد الإلكتروني، العنوان.",
    colors:"#FFFFFF"
  },
  {
    id: 2,
    title: "بيانات الدفع",
    content: "معلومات بطاقة الدفع (يتم معالجتها عبر بوابات دفع آمنة).",
    colors:"#E4D5C8"
  },
];

const usageItems = [
  {
    id: 1,
    icon: "🚚",
    title: "معالجة وتوصيل الطلبات",
    desc: "لضمان وصول المنتج المفضلة إلى عنوانك بدقة وفي الوقت المحدد.",
  },
  {
    id: 2,
    icon: "🎧",
    title: "تحسين خدمة العملاء",
    desc: "الرد السريع على استفساراتك وحل أي مشكلات قد تواجهك بكفاءة.",
  },
  {
    id: 3,
    icon: "📣",
    title: "التسويق المخصص",
    desc: "إرسال العروض الحصرية والإصدارات الجديدة التي تناسب ذوقك (يمكنك إلغاء الاشتراك في أي وقت).",
  },
];

const sharingItems = [
  {
    id: 1,
    icon: "🖥️",
    title: "مزودو التقنية",
    desc: "خدمات الاستضافة وخدمات التحليل.",
  },
  {
    id: 2,
    icon: "💳",
    title: "مزودو الدفع",
    desc: "بوابات الدفع الآمنة لمعالجة المعاملات.",
  },
  {
    id: 3,
    icon: "📦",
    title: "شركات الشحن",
    desc: "لتسهيل وإتمام توصيل الطلبات.",
  },
];

const rightsItems = [
  "الوصول إلى بياناتك الشخصية وتعديلها في أي وقت من خلال حسابك.",
  "طلب حذف حسابك وكافة البيانات المرتبطة به.",
  "إلغاء الاشتراك من النشرات البريدية والرسائل التسويقية.",
  "الحصول على نسخة من بياناتك المحفوظة لدينا.",
];

export default function PrivacyPolicyPage() {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

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
          <img src={database} alt="" />
          <h2>ما البيانات التي نجمعها؟</h2>
        </div>
      </div>

      <div className="accordionSection">
        {dataCollectedItems.map((item) => (
          <div className="accordionItem" key={item.id} style={{backgroundColor:item.colors}}>
            <div
              className="accordionHeader"
              onClick={() => toggleItem(item.id)}
            >
              <span className="accordionArrow">
                {openId === item.id ? "▲" : "▼"}
              </span>
              <span className="accordionTitle">{item.title}</span>
              <span className="accordionNumber">
                {String(item.id).padStart(2, "0")}
              </span>
            </div>
            {openId === item.id && (
              <div className="accordionBody">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="usageSection">
        <h2>كيف نستخدم بياناتك؟</h2>
        <div className="usageCards">
          {usageItems.map((item) => (
            <div className="usageCard" key={item.id}>
              <div className="usageCardIcon">{item.icon}</div>
              <div className="usageCardText">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sharingSection">
        <h2>مشاركة البيانات</h2>
        <p className="sharingDesc">
          نحن لا نبيع بياناتك أبدًا. نشارك الحد الأدنى المطلوب مع شركائنا
          الموثوقين فقط لتقديم الخدمة:
        </p>
        <div className="sharingCards">
          {sharingItems.map((item) => (
            <div className="sharingCard" key={item.id}>
              <div className="sharingCardIcon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rightsSection">
        <h2>الأمان وحقوقك</h2>
        <p className="rightsDesc">
          تخضع جميع بياناتك للتشفير عالي المستوى وتُخزن في خوادم آمنة، بصفتك
          مستخدمًا يحق لك دائمًا:
        </p>
        <ul className="rightsList">
          {rightsItems.map((right, index) => (
            <li key={index}>
              <span className="checkIcon">✓</span>
              <span>{right}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}