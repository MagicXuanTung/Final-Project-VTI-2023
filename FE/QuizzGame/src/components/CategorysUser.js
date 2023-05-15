import meter1 from "../assets/img/icons8-general-knowledge-96.png";
import meter2 from "../assets/img/icons8-music.svg";
import meter3 from "../assets/img/icons8-food-and-drink-96.png";
import meter4 from "../assets/img/icons8-geography-100.png";
import meter5 from "../assets/img/icons8-order-history-100.png";
import meter6 from "../assets/img/icons8-retro-tv-100.png";
import meter7 from "../assets/img/icons8-animal-64.png";
import meter8 from "../assets/img/icons8-drawing-64.png";
import meter9 from "../assets/img/icons8-sport-64.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import { useNavigate } from "react-router-dom";

export const CategorysUser = () => {

  const navigate = useNavigate()
  const onBackClick = e => {
    navigate(`/quizgame1/${e}`)
  }
  const category = [{
    src: meter1,
    category: 'General Knowledge Quiz',
    value: 'generalknowledgequiz'
  }, {
    src: meter2,
    category: 'Music Quiz',
    value: 'musicquiz'
  },
  {
    src: meter3,
    category: 'Food & Drinks Quiz',
    value: 'food&drinksquiz'
  },
  {
    src: meter4,
    category: 'Geography Quiz',
    value: 'geographyquiz'
  },
  {
    src: meter5,
    category: 'History Quiz',
    value: 'history'
  },
  {
    src: meter6,
    category: 'Science Quiz',
    value: 'science'
  },
  {
    src: meter7,
    category: 'Animals Quiz',
    value: '#'
  },
  {
    src: meter8,
    category: 'Politics Quiz',
    value: 'politics'
  }, {
    src: meter9,
    category: 'Sports Quiz',
    value: 'sports'
  }]
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
    <section className="category" id="categorys">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2 className="text-pink-400">Categories</h2>
              <p>Choose question types to solve tricky questions.<br></br> Chọn thể loại câu hỏi để tham giải đố cùng Tùng nhé!</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">

                {category.map((value) =>
                  <div onClick={() => onBackClick(value.value)} className="item">
                    <img src={value.src} alt="Image" />
                    <h5>{value.category}</h5>
                  </div>)}

              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
