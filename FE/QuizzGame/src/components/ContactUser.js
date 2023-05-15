import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/teamsquiz.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const ContactUser = () => {
  const formInitialDetails = {
    question: '',
    level: '',
    answer: '',
    topics: '',
    categorys: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Create');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Creating...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Create");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully' });
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
    }
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Create Questions" />
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Create Room To Play With Friends!</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={15} className="px-1">
                        <input type="text" value={formDetails.roomName} placeholder="RoomName" onChange={(e) => onFormUpdate('RoomName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={15} className="px-1">
                        <input type="text" value={formDetails.roomPass} placeholder="RoomPass" onChange={(e) => onFormUpdate('RoomPass', e.target.value)} />
                      </Col>
                      <Col size={12} sm={15} className="px-1">
                        <input type="text" value={formDetails.userName} placeholder="UserName" onChange={(e) => onFormUpdate('userName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={15} className="px-1">
                        <input type="text" value={formDetails.topics} placeholder="Topics" onChange={(e) => onFormUpdate('topics', e.target.value)} />
                      </Col>
                      <Col size={12} sm={15} className="px-1">
                        <input type="text" value={formDetails.categorys} placeholder="Categorys" onChange={(e) => onFormUpdate('categorys', e.target.value)} />
                      </Col>
                      <Col size={12} className="px-1">
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {
                        status.message &&
                        <Col>
                          <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
