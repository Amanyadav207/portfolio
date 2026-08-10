import useReveal from "../../../hooks/useReveal";
import AboutMe from "../AboutMe";
import ContactMe from "../ContactMe";
import Experience from "../Experience";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import MyPortfolio from "../MyPortfolio";
import MySkills from "../MySkills";

export default function Home() {
  useReveal();

  return (
    <>
      <main>
        <HeroSection />
        <Experience />
        <MyPortfolio />
        <MySkills />
        <AboutMe />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}
