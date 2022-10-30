import React from 'react';
import {Appear, Deck, Heading, ListItem, Slide, UnorderedList, Text, Quote} from 'spectacle';
import { splitWhenever } from 'ramda';

import MDX from './slides/demo.mdx';

const typo = {
  fontFamily: 'Space Grotesk',
};

const App = () => {
  const slides = splitWhenever((i: JSX.Element) => i.type === 'hr', (MDX({
    components: {
      h1: ({ children }) => (<h1 className="text-[150px] font-bold mt-5 mb-10">{children}</h1>),
      h2: ({ children }) => (<h2 className="text-7xl font-semibold">{children}</h2>),
      h3: ({ children }) => (<h3 className="text-4xl font-bold">{children}</h3>),
      h4: ({ children }) => (<h4 className="text-3xl font-bold">{children}</h4>),
      h5: ({ children }) => (<h5 className="text-2xl font-bold">{children}</h5>),
      h6: ({ children }) => (<h6 className="text-xl font-bold">{children}</h6>),
      p: ({ children }) => (<p className="text-3xl my-8">{children}</p>),
      blockquote: ({ children }) => (<Appear><Text {...typo} fontSize={38} color="#77E955">{children}</Text></Appear>),
      ul: ({ children }) => (<UnorderedList {...typo} className="text-3xl marker:text-green list-outside list-disc">{children}</UnorderedList>),
      li: ({ children }) => (<Appear><ListItem>{children}</ListItem></Appear>),
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
        <Slide key={`slide-${i}`} backgroundColor="#000" className="p-6">
          {content}
        </Slide>
      ))}
    </Deck>
  );
}

export default App;