import React, { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackCodeViewer,
  SandpackThemeProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProps,
  SandpackTheme,
} from '@codesandbox/sandpack-react';
import { range, isNil, isEmpty, keys } from 'ramda';
import { useSteps, Appear } from 'spectacle';
import clsx from 'clsx';

import Console from './Console';
import theme from '../config/sandpack-theme.json';

export type Props = {
  terminal?: boolean;
  preview?: boolean;
  highlights?: [number, number][];
  files: Record<string, string>;
  customSetup?: Record<string, Record<string, string>>;
  template?: SandpackProps['template'];
};

type Decorator = {
  className: 'highlight';
  line: number
};

const Code = ({
  terminal = false,
  preview = false,
  highlights = [],
  files,
  customSetup = {},
  template
}: Props): JSX.Element => {
  const [decorators, setDecorators] = useState<Decorator[] | undefined>();
  const [currentTab, _setCurrentTab] = useState<string>(keys(files)[0]);
  const { step, isActive, placeholder } = useSteps(highlights.length + 1);

  useEffect(() => {
    if (isActive && step !== highlights.length) {
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
    <div className="max-h-full w-full overflow-auto rounded-lg -mx-4 bg-gray border border-gray-clear">
      {placeholder}
      {!isNil(highlights) && !isEmpty(highlights) && step !== highlights.length && (
        <style>
          {`
            .sp-preview-wrapper .cm-line { opacity: 0.5;}
            .sp-preview-wrapper .highlight { opacity: 1;}
          `}
        </style>
      )}
      <style>
        {`
          .sp-preview-wrapper .cm-line { padding-left: 4px !important; }
          .sp-console .sp-button { bottom: auto; top: var(--sp-space-2); }
          .sp-console > div > div { padding-top: 5px; padding-bottom: 5px; }
        `}
      </style>
      <SandpackProvider
        template={template}
        customSetup={{
          entry: currentTab,
          ...customSetup,
        }}
        files={{
          ...files,
          'log.ts': {
            code: `export default (...args) => {
              let input = args;
              if (!Array.isArray(input)) input = [args];
              console.log(...input);
            }`,
            hidden: true
          }
        }}
      >
        <SandpackThemeProvider theme={theme as SandpackTheme} className="w-full">
          <div className="flex w-[1232px]">
            <div className={clsx('relative border-r border-gray-clear', preview || terminal ? 'w-1/2' : 'w-full')}>
              <div className={clsx(
                'transition-opacity',
                step === highlights.length ? 'opacity-100' : 'opacity-50'
              )}>
                <SandpackCodeEditor />
              </div>
              <div className={clsx(
                'transition-opacity sp-preview-wrapper absolute inset-0',
                step === highlights.length ? 'opacity-0 -z-[1]' : 'opacity-100'
              )}>
                <SandpackCodeViewer decorators={decorators} />
              </div>
            </div>
            <div className={clsx(
              'w-1/2 shrink-0 bg-gray transition-opacity',
              step === highlights.length ? 'opacity-100' : 'opacity-0'
              )}>
              {preview && (
                <SandpackPreview />
              )}
              {terminal && !preview && (
                <SandpackPreview className="h-0 flex-0 min-w-0" />
              )}
              {terminal && (
                <div className="w-full bg-gray">
                  <Console />
                </div>
              )}
            </div>
          </div>
        </SandpackThemeProvider>
      </SandpackProvider>
    </div>
  );
};

export default Code;