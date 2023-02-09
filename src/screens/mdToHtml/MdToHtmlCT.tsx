import React from 'react';
import { useEffect, useState } from 'react';
import MdToHtmlPT from './MdToHtmlPT';

const MdToHtmlCT = () => {
  const [text, setText] = useState('');

  return <MdToHtmlPT text={text} setText={setText} />;
};

export default MdToHtmlCT;
