import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/HeaderSection/Header";
import GroupSection from "../../components/GroupSection/GroupSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import BestSeller from "../../components/BestSeller/BestSeller";

import "./HomePage.css";
export default function homePage() {
  return (
    <>
      <div className="HomePage">
        <div className="HomePageHader">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="HeaderBgVideo"
          >
            <source src="../../assets/vedio.mp4" type="video/mp4" />
          </video>
          <div className="HeaderContent">
            <NavBar />
            <Header />
          </div>
        </div>
        <GroupSection />
        <AboutSection />
        <BestSeller />
      </div>
    </>
  );
}