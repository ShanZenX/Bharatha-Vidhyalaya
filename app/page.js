import Achievements from "./components/home/Achievements";
import Facilities from "./components/home/Facilities";
import Hero from "./components/home/Hero";
import WhyChooseUs from "./components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
            <Facilities/>

      <WhyChooseUs/>
      <Achievements/>
    </>
  );
}