import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/img/logo.png";
import navIcon1 from '../assets/img/icons8-youtube.svg';
import navIcon2 from '../assets/img/icons8-facebook.svg';
import navIcon3 from '../assets/img/icons8-discord-new.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
          <div className="social-icon">
                <a href="https://www.youtube.com/channel/UCb2A-AH-iAIARB-kDk13ANQ"><img src={navIcon1} alt="" /></a>
                <a href="https://www.facebook.com/XuanTungMagic61K3/"><img src={navIcon2} alt="" /></a>
                <a href="https://discord.gg/g5sBRyHZsT"><img src={navIcon3} alt="" /></a>
              </div>
            <p>Copyright MagicXuanTung 2023. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
