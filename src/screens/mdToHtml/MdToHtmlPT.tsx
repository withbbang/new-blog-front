import React from 'react';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './styles.module.scss';
import { MdToHtmlType } from './MdToHtmlCT';

const MdToHtmlPT = (
  props: MdToHtmlType
  /* 대체 방법 { text, setText }: MdToHtmlType */
) => {
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
