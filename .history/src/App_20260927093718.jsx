import "./App.css";
import HomePage from "./pages/HomePage/homePag";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import GroupPage from "./pages/GroupPage/GroupPage";
import GroupCatalog from "./pages/groupCatalog/groupCatalog";
import AboutRashetEtr from "./pages/AboutRashetEtr/AboutRashetEtr";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/privacyPolicy"
import PolicyReplace from "./pages/PolicyReplace/PolicyReplace"
import ContactUs from "./pages/ContactUs/ContactUs"
function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/GroupPage" element={<GroupPage />} />
        <Route path="/GroupCatalog/:id" element={<GroupCatalog />} />
        <Route path="/AboutRashetEtr" element={<AboutRashetEtr />} />
        <Route path="/PrivacyPolicyPage" element={<PrivacyPolicyPage />} />
        <Route path="/PolicyReplace" element={<PolicyReplace />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/PerfumePge" element={<PerfumePge />} />




      </Routes>

      <Footer />
    </>
  );
}

export default App;