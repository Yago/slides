import React from 'react';

export type Props = {
  children: JSX.Element | string;
};

const Highlight = ({ children }: Props): JSX.Element => (
  <span className="text-green">
    {children}
  </span>
);

Highlight.defaultProps = {};

export default Highlight;
