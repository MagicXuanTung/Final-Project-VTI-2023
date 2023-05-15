import { useLocation } from "react-router-dom";
import { BannerUser } from "./BannerUser";
import { CategorysUser } from "./CategorysUser";
import { ContactUser } from "./ContactUser";
import { Footer } from "./Footer";
import { NavBarUser } from "./NavBarUser";
import { TopicsUser } from "./TopicsUser";

function Homelogin() {
    const location = useLocation();
    return (
        <div className="Homelogin">
            <NavBarUser name={location.state.username} />
            <BannerUser name={location.state.username} />
            <CategorysUser name={location.state.username} />
            <TopicsUser name={location.state.username} />
            <ContactUser name={location.state.username} />
            <Footer />
        </div>
    );
}


export default Homelogin;