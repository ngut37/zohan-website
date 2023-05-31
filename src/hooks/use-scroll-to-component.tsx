import React, { useRef } from 'react';

export const useScrollToComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToComponent = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return {
    InvisibleComponent: () => (
      <div ref={ref} style={{ visibility: 'hidden' }} />
    ),
    scrollToComponent,
  };
};
