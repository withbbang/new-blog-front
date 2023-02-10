import React from 'react';
import { useEffect, useState } from 'react';
import MdToHtmlPT from './MdToHtmlPT';

const MdToHtmlCT = () => {
  const [text, setText] = useState('');

  // textarea에서 tab키 적용되게 하기
  const handleTextAreaTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const el = document.getElementById('textarea') as HTMLTextAreaElement;

      el.setRangeText('  ', el.selectionStart, el.selectionStart, 'end');
    }
  };

  return (
    <MdToHtmlPT
      text={text}
      setText={setText}
      onTextAreaTab={handleTextAreaTab}
    />
  );
};

export type MdToHtmlType = {
  text: string;
  setText: (text: string) => void;
  onTextAreaTab: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export default MdToHtmlCT;
