import React from 'react';
import { useEffect, useState } from 'react';
import MdToHtmlPT from './MdToHtmlPT';

const MdToHtmlCT = () => {
  const [text, setText] = useState('');

  return <MdToHtmlPT text={text} setText={setText} />;
};

export type MdToHtmlType = {
  text: string;
  setText: (text: string) => void;
};

export default MdToHtmlCT;
