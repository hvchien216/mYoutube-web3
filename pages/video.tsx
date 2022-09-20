import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import Video from '../components/video';
import VideoContainer from '../components/video/video-container';
import { GET_VIDEOS } from '../queries';
import { IVideo } from '../types/Video';

export default function VideoPage() {
  const [video, setVideo] = useState<IVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<IVideo[]>([]);

  const client = useApolloClient();
  const getUrlVars = () => {
    var vars: Record<string, string> = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function aaa(m, key, value): any {
        vars[key] = value;
      }
    );
    return vars;
  };


  const getRelatedVideos = () => {
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 20,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {},
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setRelatedVideos(data.videos);
        const video = data?.videos?.find(
          (video: IVideo) => video.id === getUrlVars().id
        );
        setVideo(video);
      })
      .catch((err: any) => {
        alert(`Something went wrong. please try again.!, ${err.message}`);
      });
  };

  useEffect(() => {
    getRelatedVideos();
  }, []);

  return (
    <div className="w-full   bg-[#1a1c1f]  flex flex-row">
      <div className="flex-1 flex flex-col">
        {video && (
          <div className="flex flex-col m-10 justify-between      lg:flex-row">
            <div className="lg:w-4/6 w-6/6">
              <VideoContainer video={video} />
            </div>
            <div className="w-2/6">
              <h4 className="text-md font-bold text-white ml-5 mb-3">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <div
                  onClick={() => {
                    setVideo(video);
                  }}
                  key={video.id}
                >
                  <Video video={video} horizontal={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
