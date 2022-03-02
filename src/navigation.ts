import * as d3 from 'd3';
import { identity, keyBy, max } from 'lodash';
import { focus, blur, preventDefault } from './event-utils';

type NavigationOptions = {
  max?: number;
  previousKeys?: string[];
  nextKeys?: string[];
};

export function initNavigation({
  max = 0,
  previousKeys = ['ArrowUp', 'ArrowLeft', 'KeyH', 'KeyK', 'KeyW', 'KeyA'],
  nextKeys = [
    'ArrowDown',
    'ArrowRight',
    'KeyJ',
    'KeyL',
    'KeyS',
    'KeyD',
    'Space',
  ],
}: NavigationOptions = {}) {
  const keys = {
    previous: keyBy(previousKeys),
    next: keyBy(nextKeys),
  };
  const listeners: {
    previous: ((page: number) => void) | undefined;
    next: ((page: number) => void) | undefined;
  } = {
    previous: undefined,
    next: undefined,
  };

  const nav = {
    current: 0,
    previousPage() {
      if (nav.current > 0) {
        nav.current--;
        if (listeners.next) listeners.next(nav.current);
      }
      return nav;
    },
    nextPage() {
      if (nav.current < max) {
        nav.current++;
        if (listeners.next) listeners.next(nav.current);
      }
      return nav;
    },
    bind: ($div: HTMLElement) => {
      d3.select($div)
        .on('pointerup', nav.events.onClick)
        .on('keydown', nav.events.onKeyDown)
        .on('contextmenu', preventDefault) // avoid opening context menu on right click
        .on('mouseenter', focus)
        .on('mouseleave', blur);
      return nav;
    },
    on(type: 'previous' | 'next', listener?: (page: number) => void) {
      listeners[type] = listener;
      return nav;
    },
    events: {
      onClick(e: MouseEvent) {
        if (e.button === 2) nav.previousPage();
        else if (e.button === 0) nav.nextPage();
      },
      onKeyDown(e: KeyboardEvent) {
        if (e.code in keys.previous) nav.previousPage();
        else if (e.code in keys.next) nav.nextPage();
      },
    },
  };
  return nav;
}
