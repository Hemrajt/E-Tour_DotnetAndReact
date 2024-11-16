import {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';


function Carousel1() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img 
            className="d-block img-fluid"
            src="/Images/Cro1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            
            <h4>“Man cannot discover new oceans unless he has the courage to lose sight of the shore.”</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-image img-fluid"
            src="/Images/Cro2.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
           
            <h4>“Don't tell me how educated you are, tell me how much you have travelled.”</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-image img-fluid"
            src="/Images/Cro3.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
           
          <h4>
            “A good traveler has no fixed plans, and is not intent on arriving.”
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
 
export default Carousel1;