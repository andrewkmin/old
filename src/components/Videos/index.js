import uniq from "uniq";
import React from "react";
import axios from "axios";
import { Box, Center, Container, Spinner, Text } from "@chakra-ui/react";

export default class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      fetching: true,
      nextPageToken: "",
      error: { isError: false, reason: null },
    };
  }
  async fetchVideos() {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&max_results=3&pageToken=${this.state.nextPageToken}&type=video&q=funny`
      );
      this.setState({
        fetching: false,
        nextPageToken: data.nextPageToken,
        videos: uniq([...this.state.videos, ...data.items]),
      });
      return data;
    } catch (error) {
      this.setState({
        fetching: false,
        error: {
          isError: true,
          reason: error.message,
        },
      });
      console.error(error);
      return error;
    }
  }

  componentDidMount() {
    this.fetchVideos();
    window.onscroll = () => {
      if (
        window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight
      ) {
        return this.fetchVideos();
      }
    };
  }

  render() {
    return (
      <Box>
        <Container>
          {this.state.fetching ? (
            <Center>
              <Spinner color="blue.500" />
            </Center>
          ) : this.state.error.isError ? (
            <Box>
              <Center>
                <Text fontWeight={"semibold"} fontSize={"lg"}>
                  Looks like you've exceeded your video quota 💔
                </Text>
              </Center>
            </Box>
          ) : (
            <Box>
              {Array.from(this.state.videos).map((video) => {
                return (
                  <Box p={5} boxShadow={"xl"} key={video?.id?.videoId}>
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
  }
}
