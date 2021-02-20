import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Box, Center, Container, Spinner, Text } from "@chakra-ui/react";

const Videos = () => {
  const fetchVideos = useRef(() => {});
  const [states, setState] = useState({
    videos: [],
    fetching: true,
    error: {
      isError: false,
      reason: null,
    },
  });

  fetchVideos.current = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&max_results=3`
      );
      setState({ videos: [...states.videos, ...data.items], fetching: false });
      return data;
    } catch (error) {
      console.error(error);
      setState({
        fetching: false,
        error: {
          isError: true,
          reason: error,
        },
      });
      return error;
    }
  };

  useEffect(() => {
    fetchVideos.current();
    window.onscroll = () => {
      if (
        window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight
      ) {
        fetchVideos.current();
      }
    };
  }, []);

  return (
    <Box>
      <Container>
        {states.fetching ? (
          <Center>
            <Spinner color="blue.500" />
          </Center>
        ) : states.error.isError ? (
          <Box>
            <Center>
              <Text color={"gray"} fontWeight={"semibold"} fontSize={"lg"}>
                Looks like you've exceeded your video quota 💔
              </Text>
            </Center>
          </Box>
        ) : (
          <Box>
            {states.videos?.map((video) => {
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
