
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { Categorys } from "./Categorys";
import { Topics } from "./Topics";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

function Home() {
  return (
    <div className="Home">
      <NavBar />
      <Banner />
      <Categorys />
      <Topics />
      <Contact />
      <Footer />
    </div>
  );
}



export default Home;

