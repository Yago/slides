import React from 'react';
import {Appear, Deck, Heading, ListItem, Slide, UnorderedList, Text} from 'spectacle';
import { splitWhenever } from 'ramda';

import MDX from './slides/demo.mdx';

const App = () => {
  const slides = splitWhenever((i: JSX.Element) => i.type === 'hr', (MDX({
    components: {
      h1: ({ children }) => (<Heading fontSize="h1">{children}</Heading>),
      h2: ({ children }) => (<Heading fontSize="h2">{children}</Heading>),
      h3: ({ children }) => (<Heading fontSize="h3">{children}</Heading>),
      h4: ({ children }) => (<Heading fontSize="h4">{children}</Heading>),
      h5: ({ children }) => (<Heading fontSize="h5">{children}</Heading>),
      h6: ({ children }) => (<Heading fontSize="h6">{children}</Heading>),
      p: ({ children }) => (<Text fontSize={32}>{children}</Text>),
      ul: ({ children }) => (<UnorderedList fontSize={32}>{children}</UnorderedList>),
      li: ({ children }) => (<Appear><ListItem>{children}</ListItem></Appear>)
    }
  }) as JSX.Element).props.children);

  return (
    <Deck>
      {slides.map((content, i) => (
        <Slide key={`slide-${i}`}>
          {content}
        </Slide>
      ))}
    </Deck>
  );
}

export default App;