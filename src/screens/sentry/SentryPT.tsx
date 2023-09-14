import React from 'react';
import styles from './styles.module.scss';

const SentryPT = ({ onThrowErr }: TypeSentry) => (
  <>
    Sentry Test Page
    <br />
    <button onClick={onThrowErr}>Error!</button>
  </>
);

interface TypeSentry {
  onThrowErr: () => void;
}

export default SentryPT;
