import "./AboutSection.css";
import { useNavigate } from "react-router-dom";
export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <div className="AboutSection">
      <div className="AboutSectionContent">
        <div className="AboutSectionHead">
          <h2>عن رشة عطر..</h2>
        <span className="AboutTitleLine"></span>
        </div>
        <p>
          في رشة عطر، نؤمن أن العطر ليس مجرد رائحة، بل هو حضور يسبقك ويحكي عن
          شخصيتك. نسعى لتقديم عطور فاخرة تترك أثرًا يدوم، وجمالًا يعكس ذوقك
          وتميزك، لنمنحك تجربة عطرية استثنائية تناسب كل لحظة.
        </p>
        <button className="AboutSectionButton" onClick={()=>navigate("/AboutRashetEtr")}>
            اقرأ المزيد

        </button>
      </div>
    </div>
  );
}
