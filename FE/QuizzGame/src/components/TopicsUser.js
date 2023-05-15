import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
// projects
import projImg1 from "../assets/img/General Knowledge Quiz.png";
import projImg2 from "../assets/img/Music Quiz.png";
import projImg3 from "../assets/img/Food & Drinks Quiz.png";
import projImg4 from "../assets/img/Geography Quiz.png";
import projImg5 from "../assets/img/Animals Quiz.png";
import projImg6 from "../assets/img/Sports Quiz.png";
//projects1
import projImg7 from "../assets/img/Science and Nature.png";
import projImg8 from "../assets/img/Computer Quiz.png";
import projImg9 from "../assets/img/Politics.png";
import projImg10 from "../assets/img/Vehicles.png";
import projImg11 from "../assets/img/Comics.png";
import projImg12 from "../assets/img/Video Games.png";
//projects2
import projImg13 from "../assets/img/Board Games.png";
import projImg14 from "../assets/img/Books.png";
import projImg15 from "../assets/img/Television.png";
import projImg16 from "../assets/img/Films.png";
import projImg17 from "../assets/img/Celebrities.png";
import projImg18 from "../assets/img/Mathematics.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useNavigate } from "react-router-dom";


export const TopicsUser = () => {
  const navigate = useNavigate()
  const onBackClick = e => {
    navigate(`/hometopic`)
  }
  const projects = [
    {
      title: "General Knowledge",
      description: "Findout General Knowledge Quiz",
      imgUrl: projImg1,
    },
    {
      title: "Music",
      description: "I love singing and listening music",
      imgUrl: projImg2,
    },
    {
      title: "Food & Drinks",
      description: "Food and drink give us energy",
      imgUrl: projImg3,
    },
    {
      title: "Geography",
      description: "Learn about different lands and countries",
      imgUrl: projImg4,
    },
    {
      title: "Animals",
      description: "Explore the animal world",
      imgUrl: projImg5,
    },
    {
      title: "Sports",
      description: "Sports strengthens the body and mind",
      imgUrl: projImg6,
    },
    {
      title: "Board Games",
      imgUrl: projImg13,
    },
    {
      title: "Books",
      imgUrl: projImg14,
    },
    {
      title: "Television",
      imgUrl: projImg15,
    },
    {
      title: "Films",
      imgUrl: projImg16,
    },
    {
      title: "Celebrities",
      imgUrl: projImg17,
    },
    {
      title: "Mathematics",
      imgUrl: projImg18,
    },
    {
      title: "Sports",
      description: "Sports strengthens the body and mind",
      imgUrl: projImg6,
    },
    {
      title: "Science and Nature",
      imgUrl: projImg7,
    },
    {
      title: "Computer",
      imgUrl: projImg8,
    },
    {
      title: "Politics",
      imgUrl: projImg9,
    },
    {
      title: "Vehicles",
      imgUrl: projImg10,
    },
    {
      title: "Comics",
      imgUrl: projImg11,
    },

  ];
  const projects1 = [
    {
      title: "Science and Nature",
      imgUrl: projImg7,
    },
    {
      title: "Computer",
      imgUrl: projImg8,
    },
    {
      title: "Politics",
      imgUrl: projImg9,
    },
    {
      title: "Vehicles",
      imgUrl: projImg10,
    },
    {
      title: "Comics",
      imgUrl: projImg11,
    },
    {
      title: "Video Games",
      imgUrl: projImg12,
    },
    {
      title: "Board Games",
      imgUrl: projImg13,
    },
    {
      title: "Books",
      imgUrl: projImg14,
    },
    {
      title: "Television",
      imgUrl: projImg15,
    },
    {
      title: "Films",
      imgUrl: projImg16,
    },
    {
      title: "Celebrities",
      imgUrl: projImg17,
    },
    {
      title: "Mathematics",
      imgUrl: projImg18,
    },

  ];

  const projects2 = [
    {
      title: "Board Games",
      imgUrl: projImg13,
    },
    {
      title: "Books",
      imgUrl: projImg14,
    },
    {
      title: "Television",
      imgUrl: projImg15,
    },
    {
      title: "Films",
      imgUrl: projImg16,
    },
    {
      title: "Celebrities",
      imgUrl: projImg17,
    },
    {
      title: "Mathematics",
      imgUrl: projImg18,
    },
    {
      title: "General Knowledge",
      description: "Findout General Knowledge Quiz",
      imgUrl: projImg1,
    },
    {
      title: "Music",
      description: "I love singing and listening music",
      imgUrl: projImg2,
    },
    {
      title: "Food & Drinks",
      description: "Food and drink give us energy",
      imgUrl: projImg3,
    },
    {
      title: "Geography",
      description: "Learn about different lands and countries",
      imgUrl: projImg4,
    },
    {
      title: "Animals",
      description: "Explore the animal world",
      imgUrl: projImg5,
    },
    {
      title: "Sports",
      description: "Sports strengthens the body and mind",
      imgUrl: projImg6,
    },

  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



  return (
    <section className="project" id="topics">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="text-blue-500">Topics</h2>
                  <p>The most popular topics, recommend having many players participate <p></p>
                    Các chủ đề phổ biến nhất, khuyến nghị có nhiều người chơi tham gia các câu đố</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Popular 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Popular 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Popular 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first" onClick={onBackClick}>
                        <Row>
                          {
                            projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second" onClick={onBackClick}>
                        <Row>
                          {
                            projects1.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third" onClick={onBackClick}>
                        <Row>
                          {
                            projects2.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
