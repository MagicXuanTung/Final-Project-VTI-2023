import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/icons8-youtube.svg';
import navIcon2 from '../assets/img/icons8-facebook.svg';
import navIcon3 from '../assets/img/icons8-discord-new.svg';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { Link } from 'react-scroll';




export const NavBarUser = (props) => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // 
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

  // ĐIỀU HƯỚNG LOGOUT
  const navigate = useNavigate()
  const handleSignout = async () => {
    const res = await axios.post('http://localhost:8080/api/auth/signout', {
    })
    const resdata = res.data // data JSON POSTMAN
    const status = res.status // status http
    const data_status = resdata.status // status ResponseObject
    const token = resdata.accessToken
    const id = resdata.id
    const username = resdata.username
    localStorage.removeItem('userId', id)
    localStorage.removeItem('token', token)
    localStorage.removeItem('username', username) // save token
    console.log({
      userId: id,
      data: resdata,
      status: status,
      message: resdata.message,
      datastatus: data_status,
      accessToken: token,
    })
    let path = `/`
    navigate(path)
  };

  const onBackClick = e => {
    e.preventDefault()
    navigate("/profile")
  }


  return (
    <Navbar className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/Homelogin">
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
                className="text-purple-50 hover:text-green-500 uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-medium"
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
                className="text-purple-50 hover:text-pink-400 uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-medium"
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
                className="text-purple-50 hover:text-blue-500 uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-medium"
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
                className="text-purple-50 hover:text-yellow-500 uppercase no-underline px-3 py-2 mx-4 rounded-md text-base font-medium"
              >
                Create Room
              </Link>
            </nav>

          </Nav>
          <span className="navbar-text">
            <div className="social-icon flex flex-row h-[60px] items-center">
              <a href="https://www.youtube.com/channel/UCb2A-AH-iAIARB-kDk13ANQ"><img src={navIcon1} alt="" /></a>
              <a href="https://www.facebook.com/XuanTungMagic61K3/"><img src={navIcon2} alt="" /></a>
              <a href="https://discord.gg/g5sBRyHZsT"><img src={navIcon3} alt="" /></a>
            </div>
            <div class="avatar-dropdown">
              <button class="avatar-btn" >
                {props.name}
              </button>
              <ul class="dropdown-menu">
                <button><a className="profile" onClick={onBackClick}>Profile</a></button>
                <button><a className="logout" onClick={handleSignout}>Logout</a></button>
              </ul>
            </div>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


