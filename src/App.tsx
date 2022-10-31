import React from 'react';
import {
  Appear,
  Deck,
  ListItem,
  Slide,
  UnorderedList,
  Text,
  fadeTransition,
  Progress,
} from 'spectacle';
import { isNil, splitWhenever } from 'ramda';

import Step from './components/Step';

import zod from './slides/zod.mdx';

const mdx = {
  zod,
};

const typo = {
  fontFamily: 'Space Grotesk',
};

const App = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params: {
    slides?: 'zod'
  } = Object.fromEntries(urlSearchParams.entries());

  if (isNil(params.slides)) return <div className="w-screen h-screen flex justify-center items-center bg-black text-white text-4xl">Wrong slides...</div>;

  const content = mdx[params.slides];

  const slides = splitWhenever((i: JSX.Element) => i.type === 'hr', (content({
    components: {
      h1: ({ children }) => (<h1 className="text-8xl font-bold my-5 text-center mt-64">{children}</h1>),
      h2: ({ children }) => (<h2 className="text-7xl font-semibold mb-10">{children}</h2>),
      h3: ({ children }) => (<h3 className="text-4xl font-bold">{children}</h3>),
      h4: ({ children }) => (<h4 className="text-3xl font-bold">{children}</h4>),
      h5: ({ children }) => (<h5 className="text-2xl font-bold">{children}</h5>),
      h6: ({ children }) => (<h6 className="text-xl font-bold">{children}</h6>),
      p: ({ children }) => (<p className="text-3xl my-4">{children}</p>),
      blockquote: ({ children }) => (<Appear><Text {...typo} fontSize={38} color="#77E955">{children}</Text></Appear>),
      ul: ({ children }) => (<ul className="text-3xl marker:text-green list-inside list-disc space-y-4">{children}</ul>),
      li: ({ children }) => (<Step><li>{children}</li></Step>),
      a: ({ href, children }) => (<a href={href} target="_blank" className="text-green underline underline-offset-6">{children}</a>),
    }
  }) as JSX.Element).props.children);

  return (
    <Deck theme={{
      colors: {
        primary: '#fff',
        secondary: '#fff'
      },
    }}>
      {slides.map((content, i) => (
        <Slide key={`slide-${i}`} backgroundColor="#000" className="p-6" transition={fadeTransition}>
          {content}
          <div className="fixed top-2 left-1/2 -translate-x-1/2 opacity-10"><Progress/></div>
        </Slide>
      ))}
    </Deck>
  );
}

export default App;