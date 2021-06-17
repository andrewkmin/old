import Glide from "@glidejs/glide";
import { useState, useEffect } from "react";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { Box } from "@chakra-ui/react";

const Carousel = ({ element = "glide", options, children }) => {
  const [slider] = useState(new Glide(`.${element}`, options));

  useEffect(() => {
    slider.mount();

    // subscribe to an event
    slider.on("run.before", (event) => {
      // ... do something cool here
    });

    // cleanup when unmounting component
    return () => slider.destroy();
  }, [slider]);

  return (
    <Box w={"full"}>
      <div className={element}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {children.map((slide, index) => {
              return (
                <li key={index} className={"glide__slide"}>
                  {slide}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default Carousel;
