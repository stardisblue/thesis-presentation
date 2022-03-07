import * as d3 from 'd3';
import { identity, keyBy, max, range } from 'lodash';
import { focus, blur, preventDefault } from './event-utils';

type NavigationOptions = {
  max?: number;
  previousKeys?: string[];
  nextKeys?: string[];
};

type NavigationCallback = (
  page: number,
  previous: number,
  nav: ReturnType<typeof navigation>
) => void;

export function navigation({
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
    previous: NavigationCallback | undefined;
    next: NavigationCallback | undefined;
    page: NavigationCallback | undefined;
  } = {
    previous: undefined,
    next: undefined,
    page: undefined,
  };

  const nav = {
    current: 0,
    previousPage() {
      const last = nav.current;
      if (last > 0) {
        nav.current--;
        if (listeners.previous) listeners.previous(nav.current, last, nav);
        if (listeners.page) listeners.page(nav.current, last, nav);
      }
      return nav;
    },
    nextPage() {
      const last = nav.current;
      if (last < max - 1) {
        nav.current++;
        if (listeners.next) listeners.next(nav.current, last, nav);
        if (listeners.page) listeners.page(nav.current, last, nav);
      }
      return nav;
    },
    collect(offset: number = 1) {
      const bounded = Math.max(Math.min(offset + nav.current, max - 1), 0);
      return range(nav.current + 1, bounded + 1, Math.sign(offset));
    },
    page(goto: number) {
      if (goto !== nav.current) {
        const last = nav.current;
        nav.current = Math.max(Math.min(goto, max - 1), 0);
        if (listeners.page) listeners.page(nav.current, last, nav);
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
    on(type: 'previous' | 'next' | 'page', listener?: NavigationCallback) {
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
