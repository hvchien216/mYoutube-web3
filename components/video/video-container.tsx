import React from 'react';
import { IVideo } from '../../types/Video';
import Player from '../player';

interface IProps {
  video: IVideo;
}

const VideoContainer: React.FC<IProps> = ({ video }) => {
  return (
    <div>
      <Player hash={video.hash} />
      <div className='flex justify-between flex-row py-4'>
        <div>
          <h3 className='text-2xl dark:text-white'>{video.title}</h3>
          <p className='text-gray-500 mt-1'>
            {video.category} •{' '}
            {new Date((video.createdAt as any) * 1000).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
