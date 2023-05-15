import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/icons8-youtube.svg';
import navIcon2 from '../assets/img/icons8-facebook.svg';
import navIcon3 from '../assets/img/icons8-discord-new.svg';
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom"

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  // ĐIỀU HƯỚNG SANG LOGIN
  const navigate = useNavigate()

  const onBackClick = e => {
    e.preventDefault()
    // navigate(-1);
    navigate("login")
  }



  return (

    <Navbar className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <nav className="flex justify-center">
              <Link
                to="introduce"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={
                  activeLink === "introduce"
                    ? "active nav-link"
                    : "nav-link"
                }
                onClick={() => onUpdateActiveLink("introduce")}
                className=" text-gray-300 hover:text-white uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-large"
              >
                Introduce Quiz
              </Link>
              <Link
                to="categorys"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={
                  activeLink === "categorys"
                    ? "active nav-link"
                    : "nav-link"
                }
                onClick={() => onUpdateActiveLink("categorys")}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                className=" text-gray-300 hover:text-white uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-large"
              >
                Categories
              </Link>
              <Link
                to="topics"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={
                  activeLink === "topics"
                    ? "active nav-link"
                    : "nav-link"
                }
                onClick={() => onUpdateActiveLink("topics")}
                className=" text-gray-300 hover:text-white uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-large"
              >
                Topics
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={
                  activeLink === "contact"
                    ? "active nav-link"
                    : "nav-link"
                }
                onClick={() => onUpdateActiveLink("contact")}
                className=" text-gray-300 hover:text-white uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-large"
              >
                Create Room
              </Link>
            </nav>

          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.youtube.com/channel/UCb2A-AH-iAIARB-kDk13ANQ"><img src={navIcon1} alt="" /></a>
              <a href="https://www.facebook.com/XuanTungMagic61K3/"><img src={navIcon2} alt="" /></a>
              <a href="https://discord.gg/g5sBRyHZsT"><img src={navIcon3} alt="" /></a>
            </div>
            <button onClick={onBackClick}><span>Login to play!</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
