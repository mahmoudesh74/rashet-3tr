import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/HeaderSection/Header";
import GroupSection from "../../components/GroupSection/GroupSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import BestSeller from "../../components/BestSeller/BestSeller"

import "./HomePage.css";
export default function homePage() {
  return (
    <>
    <div className="HomePage">
      <div className="HomePageHader">
        <NavBar />
        <Header />
      </div>
        <GroupSection />
        <AboutSection />
        <BestSeller />
      </div>
    </>
  );
}
