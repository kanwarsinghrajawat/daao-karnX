'use client';

import React, { JSX } from 'react';

interface BaseTextProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

type TextProps = BaseTextProps & {
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({ type, className = '', children }) => {
  const typeStyles: Record<TextProps['type'], string> = {
    h1: 'font-mono',
    h2: 'font-mono',
    h3: 'font-mono',
    h4: 'font-mono',
    h5: 'font-mono',
    h6: 'font-mono',
    p: 'font-mono',
    span: 'font-mono',
  };

  // className comes first so it takes precedence
  const combinedClass = `${className} ${typeStyles[type]}`;

  const Element = type as keyof JSX.IntrinsicElements;

  return <Element className={combinedClass}>{children}</Element>;
};

export default Text;
