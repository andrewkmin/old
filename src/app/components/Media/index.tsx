import { Image } from "@chakra-ui/react";

type MediaProps = {
  url: string;
  mimetype: string;
};

/**
 * Dynamic media loader, based on the mimetype of the attachment
 */
const Media = ({ url, mimetype, ...rest }: MediaProps) => {
  if (mimetype === "image") return <Image {...rest} src={url} />;
  else if (mimetype === "video") {
    return (
      <video>
        <source src={url}></source>
        Your browser does not support HTML5 video
      </video>
    );
  } else return null;
};

export default Media;
