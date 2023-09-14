import React, { useEffect } from 'react';
import SentryPT from './SentryPT';

const SentryCT = () => {
  useEffect(() => {}, []);

  const handleThrowErr = () => {
    console.log(process.env.REACT_APP_SENTRY_DSN);
    throw Error('에러!');
  };

  return <SentryPT onThrowErr={handleThrowErr} />;
};

export default SentryCT;
