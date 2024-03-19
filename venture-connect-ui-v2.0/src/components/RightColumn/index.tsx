import React from 'react';

import LoadingTrendingPanel from '../Shimmer/LoadingTrendingPanel';
import TrendingPanel from './TrendingPanel';
const RightColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
      isLoading ? (
        <LoadingTrendingPanel />
      ) : (
        <>
          <TrendingPanel />
        </>
      )
  );
};

export default RightColumn;
