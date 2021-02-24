import { Helmet } from "react-helmet-async";
import Videos from "../components/Videos/index";

export default function VideosPage() {
  return (
    <>
      <Helmet>
        <title>Videos - Usocial</title>
      </Helmet>
      <Videos />
    </>
  );
}
