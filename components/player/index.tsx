import React from "react";
import { useAsset } from "@livepeer/react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface IProps {
  hash: string;
}

const Player: React.FC<IProps> = ({ hash }) =>  {
  const { data: asset } = useAsset(hash);

  return (
    <Plyr
      source={{
        type: "video",
        title: asset?.name,

        sources: [
          {
            src: asset?.downloadUrl as string,
            type: "video/mp4",
          },
        ],
      }}
      options={{
        autoplay: true,
      }}
      autoPlay={true}
    />
  );
}

export default Player