import * as d3 from 'd3';
import { html } from 'htl';

export type PageObject = {
  template?: 'title' | 'full';
  [key: string]: string | Element | Function | undefined;
};

type PageElement = HTMLElement & {
  $title: HTMLElement;
  $content: HTMLElement;
  $footer: HTMLElement;
};

async function SimplePage<T>(
  { template = 'full', ...props }: PageObject,
  data: T
): Promise<PageElement> {
  const $title = html`<h2 class="measure">
    ${await create(props.title, data)}
  </h2>`;
  const $content = html`<div>${await create(props.content, data)}</div>`;
  const $footer = html`<div class="pt5">
    ${await create(props.footer, data)}
  </div>`;

  const $page = html`<div class="h-100 w-100" style="padding: 5% 7%;" />
    <div class="h-100 w-100 flex flex-column">
      ${$title} ${$content} ${$footer}
    </div>`;

  $page.classList.toggle('items-center', template === 'title');
  $content.classList.toggle('flex-grow-1', template === 'full');

  return Object.assign($page, { $title, $content, $footer });
}

type PageState<D> = PageObject | ((data: D) => PageObject);

export function Pages({
  lazy = 2,
  Template = SimplePage,
}: {
  lazy?: number;
  Template?: (props: PageObject, data: any) => Promise<PageElement>;
} = {}) {
  const cache = new Map<PageState<any>, PageElement>();
  const history = new Map<PageState<any>, number>();
  let steps = 0;

  const $container = html`<div
    class="h-100 w-100 overflow-y-hidden helvetica"
    tabindex="0"
    style="font-size: 3vh"
  />`;

  return Object.assign($container, {
    async load<T>(newState: PageState<T>, data: T) {
      //   console.log('load', cache.has(newState), data);
      let currentPage;
      if (cache.has(newState)) {
        // checks in cache
        currentPage = cache.get(newState)!;
      } else {
        const props = typeof newState === 'object' ? newState : newState(data);
        currentPage = await Template(props, data);
        cache.set(newState, currentPage);
      }

      if (history.size > 0)
        // replace
        $container.insertBefore(currentPage, $container.firstChild);
      else $container.append(currentPage); // append

      // add to history
      steps++;
      history.set(newState, steps);

      history.forEach((v, props) => {
        // delete expired
        if (v < steps - lazy) {
          $container.removeChild(cache.get(props)!);
          history.delete(props);
          cache.delete(props);
        }
      });
    },
    async preload<T>(step: number, newState: PageState<T>, data: T) {
      if (step > lazy) return false; // do not preload more pages than necessary

      if (!cache.has(newState)) {
        // checks in cache
        const props = typeof newState === 'object' ? newState : newState(data);
        const page = await Template(props, data);
        cache.set(newState, page);
        $container.append(page);
      }

      history.set(newState, steps); // update ranking in history

      return true;
    },
    // logState() {
    //   console.log(steps);
    //   history.forEach(console.log);
    // },
  });
}

async function create<T>(res: any, data: T): Promise<string | Node> {
  res = await res;
  if (typeof res === 'string') return res;
  if (res instanceof Text) return res;
  if (res instanceof DocumentFragment) return res;
  if (res instanceof Element) return res;
  if (res instanceof d3.selection || res instanceof d3.transition)
    return (res as any).node();

  return create(res(data), data);
}
