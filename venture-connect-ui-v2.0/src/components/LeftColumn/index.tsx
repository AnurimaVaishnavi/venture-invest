import React from 'react';
import LoadingProfilePanel from '../Shimmer/LoadingProfilePanel';
import Leftprofcomp from './Profile-Companies-Panel';
import { Container } from './styles';

const LeftColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    isLoading ? (
      <LoadingProfilePanel />
    ) : (
      <>
        <Leftprofcomp />
      </>
    )
  );
};

export default LeftColumn;
