import React, { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackCodeViewer,
  SandpackThemeProvider,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  SandpackLayout
} from '@codesandbox/sandpack-react';
import { range, isNil, isEmpty } from 'ramda';
import { useSteps } from 'spectacle';

export type Props = {
  editor?: boolean;
  terminal?: boolean;
  preview?: boolean;
  highlights?: [number, number][];
  files: Record<string, string>;
};

type Decorator = {
  className: 'highlight';
  line: number
};

const Code = ({
  editor = false,
  terminal = false,
  preview = false,
  highlights = [],
  files
}: Props): JSX.Element => {
  const [decorators, setDecorators] = useState<Decorator[] | undefined>();
  const { step, isActive, placeholder } = useSteps(editor ? 0 : highlights.length);

  useEffect(() => {
    if (isActive) {
      const newDecorators = highlights.map(([a,b]) =>
        range(a, b + 1)
          .reduce((a: Decorator[], v): Decorator[] => [
            ...a,
            {className: 'highlight', line: v}
          ], [])
      );
      setDecorators(newDecorators[step]);
    } else {
      setDecorators(undefined);
    }
  }, [isActive, step]);

  return (
    <>
      {placeholder}
      {!isNil(highlights) && !isEmpty(highlights) && !editor && (
        <style>
          {`
            .sp-code-editor .cm-line { opacity: 0.5;}
            .sp-code-editor .highlight { opacity: 1;}
          `}
        </style>
      )}
      <SandpackProvider
        customSetup={{
          entry: "index.js"
        }}
        files={files}
      >
        <SandpackThemeProvider theme="dark">
          <SandpackLayout>
            {!editor && (
              <SandpackCodeViewer decorators={decorators} />
            )}
            {editor && (
              <SandpackCodeEditor />
            )}
            {preview && (
              <SandpackPreview />
            )}
            {terminal && !preview && (
              <SandpackPreview style={{height: 0, flex: 0, minWidth: 0}} />
            )}
            {terminal && (
              <SandpackConsole />
            )}
          </SandpackLayout>
        </SandpackThemeProvider>
      </SandpackProvider>
    </>
  );
};

export default Code;