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
  const [videos, setVideos] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [errorIsThrown, setErrorIsThrown] = useState(false);

  fetchVideos.current = async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&max_results=10`
      );
      setVideos(data.items);
      setFetching(false);
    } catch (error) {
      console.error(error);
      setFetching(false);
      Toast({
        title:
          "Your video quota has been exceeded, please try again after some time",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
      setErrorIsThrown(true);
    }
  };

  useEffect(() => {
    fetchVideos.current();
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
                <Box key={video.etag}>
                  <Container>
                    <Container borderRadius="lg" boxShadow="md">
                      <iframe
                        title={video.snippet.title}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </Container>
                    <a
                      href={`https://youtube.com/channel/${video.snippet.channelId}`}
                    >
                      {video.snippet.channelTitle}
                    </a>
                  </Container>
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
