import React from 'react';

import LoadingCreatePost from '../Shimmer/LoadingCreatePost';
import LoadingFeedPost from '../Shimmer/LoadingFeedPost';
import Feedoptions from './Feedoptions';


const MiddleColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
      isLoading ? (
        <>
          < LoadingCreatePost/>
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
        </>
      ) : (
        <>
          <Feedoptions/>
        </>
      )
  );
};

export default MiddleColumn;
