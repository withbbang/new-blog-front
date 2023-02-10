import React, { useEffect, useState } from 'react';
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
  const [markdownCheatSheets, setMarkdownCheatSheets] = useState(Array<string>);

  useEffect(() => {
    fetch('https://www.markdownguide.org/api/v1/cheat-sheet.json')
      .then((res) => res.json())
      .then(({ cheat_sheet }) => {
        setMarkdownCheatSheets([
          ...cheat_sheet[0]?.basic_syntax,
          ...cheat_sheet[1]?.extended_syntax
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <textarea
        id="textarea"
        value={props.text}
        onChange={(e) => props.setText(e.target.value)}
        onKeyDown={(e) => props.onTextAreaTab(e)}
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
              <div>
                {markdownCheatSheets && (
                  <div>
                    {markdownCheatSheets?.map(({ element, syntax }: any) => {
                      return (
                        <div key={element}>
                          <h1>{element}</h1>
                          <p>{syntax}</p>
                          <div>
                            <h3>Examples</h3>
                            <ReactMarkdown
                              children={syntax}
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ children, ...props }) {
                                  return (
                                    <SyntaxHighlighter
                                      children={String(children).replace(
                                        /\n$/,
                                        ''
                                      )}
                                      style={darcula}
                                      PreTag="section"
                                    />
                                  );
                                }
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
        }}
      />
    </>
  );
};

export default MdToHtmlPT;
