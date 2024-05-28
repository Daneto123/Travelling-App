// SliderComponent.tsx
import React from 'react';
import Slider from 'react-slick';

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
}

const SliderComponent: React.FC = () => {
  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ width: '80%', margin: '50px auto', marginBottom: '50px' }}>
      <Slider {...settings}>
        <div>
          <img src="https://travelplanner.app/wp-content/uploads/2021/02/1200px-Rafting_em_Brotas-800x400.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="https://admin.dmcbalkans.com/uploads/items/248/1657128198nikola-tesla-tour-round-trip-4-days-1-1920x960.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="https://admin.dmcbalkans.com/uploads/items/219/1657044310small-but-highest-town-on-the-balkan-krushevo-round-trip-5-days-1-1920x960.jpg?_gl=1*qqgy7j*_ga*MjA0NjUxMjEyNS4xNzE2NzYyNjc2*_ga_SDLEN1D1FG*MTcxNjc2MjY3NS4xLjAuMTcxNjc2MjY3NS4wLjAuOTM4MjEzMzk0" alt="Slide 3" />
        </div>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/%D0%9F%D0%BE%D0%B7%D0%B8%D1%82%D0%B0%D0%BD%D0%BE.jpg/800px-%D0%9F%D0%BE%D0%B7%D0%B8%D1%82%D0%B0%D0%BD%D0%BE.jpg?20141031103711" alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
