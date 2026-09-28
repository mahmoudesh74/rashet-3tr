import "./AboutSection.css";
export default function AboutSection() {
  return (
    <div className="AboutSection">
      <div className="AboutSectionContent">
        <h2>عن رشة عطر..</h2>
        <p>
          في رشة عطر، نؤمن أن العطر ليس مجرد رائحة، بل هو حضور يسبقك ويحكي عن
          شخصيتك. نسعى لتقديم عطور فاخرة تترك أثرًا يدوم، وجمالًا يعكس ذوقك
          وتميزك، لنمنحك تجربة عطرية استثنائية تناسب كل لحظة.
        </p>
        <button className="AboutSectionButton">
            اقرأ المزيد

        </button>
      </div>
    </div>
  );
}
