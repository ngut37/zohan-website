import React, {
  createElement,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
} from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { enumerate } from '@utils/enumerate';
import { Message, messageToString } from '@utils/message';

import { isTextTypeElement } from './utils/is-text-type-element';

import classes from './text.module.scss';

// ELEMENTS
export const textTypes = enumerate([
  // HEADINGS
  'h1',
  'h2',
  'h3',
  'h4',
  // TEXTS
  'text',
  'subtext',
  'subsubtext',
]);
export type TextType = keyof typeof textTypes;

// ELEMENTS
export const elementsTypes = enumerate([
  // HEADINGS
  'h1',
  'h2',
  'h3',
  'h4',
  // TEXTS
  'p',
  'span',
  'div',
]);

export type ElementType = keyof typeof elementsTypes;

type BaseTextProps = {
  type?: TextType;
  message: Message;
  element?: ElementType;
  className?: string;
  innerRef?: Ref<HTMLElement>;
  onClick?: () => void;
};

export type TextPropsWithMessage = BaseTextProps & {
  message: Message;
  children?: never;
};

export type TextPropsWithChildren = PropsWithChildren<
  BaseTextProps & {
    message?: never;
  }
>;

export type TextProps = TextPropsWithMessage | TextPropsWithChildren;

export const Text = ({
  type = 'text',
  message,
  element,
  className,
  onClick,
  innerRef,
  children,
}: TextProps) => {
  const intl = useIntl();

  if (isTextTypeElement(type) && !element) {
    element = type;
  } else {
    if (!element) element = 'p';
  }

  const props: HTMLAttributes<HTMLDivElement> = {
    className: clsx(
      classes.default,
      classes[type || element],
      onClick && classes.onClick,
      className,
    ),
    onClick,
    children,
  };

  if (message) {
    const content = messageToString(message, intl);

    if (message.disableHTMLRender) {
      props.children = content;
    } else if (content && typeof content === 'string') {
      props.dangerouslySetInnerHTML = { __html: content };
    }
  }

  // element
  const elementComponent = createElement(element, {
    ...props,
    ref: innerRef,
  });

  return <>{elementComponent}</>;
};
