import React from 'react';
import {AnimatePresence, motion } from 'framer-motion';
import { useSteps } from 'spectacle';

export type Props = {
  type?: 'fade';
  children: JSX.Element | string
};

const transitions = {
  fade: {
    initial: { opacity: 0, x:100 },
    animate: { opacity: 1, x:0 },
    exit: { opacity: 0, x:-100 },
    transition: { duration: 0.2 },
  }
}

const Step = ({ type = 'fade', children }: Props): JSX.Element => {
  const { isActive, placeholder } = useSteps(1);

  return (
    <>
      {placeholder}
      <AnimatePresence>
        {isActive && (
          <motion.div
            {...transitions[type]}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Step.defaultProps = {};

export default Step;
