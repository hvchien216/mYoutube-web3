import React, { useEffect, useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { IVideo } from '../../types/Video';
import Video from '../../components/video';
import { GET_VIDEOS } from '../../queries';
import { Header } from '../../components/header';

export default function Main() {
  const [search, setSearch] = useState('');
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState<IVideo[]>([]);

  // Get the client from the useApolloClient hook
  const client = useApolloClient();

  // Function to get the videos from the graph
  const getVideos = async () => {
    // Query the videos from the graph
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 200,
          skip: 0,
          orderBy: 'createdAt',
          orderDirection: 'desc',
          where: {
            ...(search && {
              title_contains_nocase: search,
            }),
          }
        },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        // Set the videos to the state
        setVideos(data.videos);
      })
      .catch((err: any) => {
        alert(`Something went wrong. please try again.! ${err.message}`);
      });
  };

  useEffect(() => {
    // Runs the function getVideos when the component is mounted
    getVideos();
  }, [search]);
  return (
    <div className='w-full bg-[#1a1c1f] flex flex-row'>
      <div className='flex-1 h-screen flex flex-col'>
        <Header
          search={(e: string) => {
            setSearch(e);
          }}
        />
        <div className='flex flex-row flex-wrap'>
          {videos.map((video) => (
            <div
              key={video.id}
              className='w-80'
              onClick={() => {
                // Navigation to the video screen (which we will create later)
                window.location.href = `/video?id=${video.id}`;
              }}
            >
              <Video video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
