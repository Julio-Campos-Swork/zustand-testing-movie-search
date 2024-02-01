import { MovieCard } from './Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export const MovieCarousel = ({ movies }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <Carousel
        additionalTransfrom={5}
        arrows
        autoplay={true}
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container-with-dots"
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        renderDotsOutside={false}
        responsive={responsive}
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Carousel>
    </>
  );
};
