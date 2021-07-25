import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const StyledLoadingBar = styled(LinearProgress)({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
});

const LoadingBar = ({ isLoadingFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoadingFinished) {
      setProgress(100);
    }
    const timer = setInterval(() => {
      setProgress((oldProgress) => oldProgress + 1);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [isLoadingFinished]);
  return <StyledLoadingBar variant="determinate" value={progress} />;
};

export default LoadingBar;
