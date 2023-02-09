import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
      <ReactMarkdown
        children={props.text}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={darcula}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
    </>
  );
};

export default MdToHtmlPT;
