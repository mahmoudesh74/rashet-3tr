import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/HeaderSection/Header";
import GroupSection from "../../components/GroupSection/GroupSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import BestSeller from "../../components/BestSeller/BestSeller";

import vedio from "../../assets/vedio.mp4";
import PerfumeSection from "../../components/PerfumeSection/PerfumeSection";
import FirstWhoKnow from "../../components/firstWhoKnow/firstWhoKnow";
import LatestArticles from "../../components/LatestArticles/latestArticles";
import Footer from "../../components/Footer/Footer";
import "./homePage.css";

export default function HomePage() {
  return (
    <>
      <NavBar />

      <div className="HomePage">
        <div className="HomePageHader">
          <video autoPlay muted loop playsInline className="HeaderBgVideo">
            <source src={vedio} type="video/mp4" />
          </video>

          <Header />
        </div>

        <GroupSection />
        <AboutSection />
        <BestSeller />
        <PerfumeSection />
        <FirstWhoKnow />
        <LatestArticles />
      </div>


      <Footer />
    </>
  );
}
