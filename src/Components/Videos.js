import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Center,
  Container,
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import { BiVideo } from "react-icons/bi";

const Videos = () => {
  const Toast = useToast();
  const fetchVideos = useRef(() => {});
  const [videos, setVideos] = useState();
  const [fetching, setFetching] = useState(true);
  const [errorIsThrown, setErrorIsThrown] = useState(false);

  fetchVideos.current = async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&max_results=3`
      );
      setVideos(data.list);
      setFetching(false);
    } catch (error) {
      console.error(error);
      setFetching(false);
      Toast({
        title: "Your video quota has been exceeded",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
      setErrorIsThrown(true);
    }
  };

  useEffect(() => {
    fetchVideos.current();
    window.onscroll = function (ev) {
      if (
        window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight
      ) {
        // alert("you're at the bottom of the page");
        fetchVideos.current();
      }
    };
  }, []);

  return (
    <Box>
      <Container>
        <Center>
          <BiVideo size="3rem" />
        </Center>
        {fetching ? (
          <Center>
            <Spinner color="blue.500" />
          </Center>
        ) : errorIsThrown ? (
          <Center>
            <Text fontWeight="extrabold">
              You have exceeded your video quota 😢
            </Text>
          </Center>
        ) : (
          <Box>
            {videos?.map((video) => {
              return (
                <Box
                  key={video?.etag}
                  mb={3}
                  p={3}
                  borderRadius="lg"
                  border="1px"
                  borderColor="gray.300"
                >
                  <Center>
                    <iframe
                      style={{
                        width: "100%",
                        height: "40vh",
                      }}
                      title={video?.snippet?.title}
                      src={`https://www.youtube.com/embed/${video?.id?.videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Center>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Videos;
