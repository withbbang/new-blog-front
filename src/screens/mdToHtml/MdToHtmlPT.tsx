import React from 'react';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './styles.module.scss';

const MdToHtmlPT = (props: any) => {
  const text = 'Just a link: https://reactjs.com.';

  return (
    <>
      <textarea
        value={props.text}
        onChange={(e) => props.setText(e.target.value)}
      ></textarea>
      <ReactMarkDown
        children={props.text}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkDown>
    </>
  );
};

export default MdToHtmlPT;
