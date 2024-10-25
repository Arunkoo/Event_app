import Associated from "../Component/Associated";
import Featured from "../Component/Featured";
import UpcomingEvent from "../Component/UpcomingEvent";
import HeroSection from "../Component/HeroSection";
import Memory from "../Component/Memory";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Associated />
      <Featured />
      <UpcomingEvent />
      <Memory />
    </div>
  );
};

export default Home;
