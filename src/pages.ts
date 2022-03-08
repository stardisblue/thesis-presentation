import * as d3 from 'd3';
import { html } from 'htl';

export type PageObject = {
  template?: 'title' | 'full';
  [key: string]:
    | string
    | Element
    | ((data: any, $holder: HTMLDivElement) => string | Element | void)
    | undefined;
};

type PageElement = HTMLElement & {
  $title: HTMLElement;
  $content: HTMLElement;
  $footer: HTMLElement;
  render: () => void;
};

function SimplePage<T>(
  { template = 'full', ...props }: PageObject,
  data: T
): PageElement {
  const $title = html`<h2 class="measure noto">
    ${create(props.title, data)}
  </h2>`;
  const $content = html`<div></div>`;
  const $footer = html`<div class="pt5">${create(props.footer, data)}</div>`;

  const $page = html`<div class="slides h-100 w-100 flex roboto" />
    <div class="w-100 flex flex-column">${$title} ${$content} ${$footer}</div>`;

  $page.classList.toggle('items-center', template === 'title');
  $content.classList.toggle('flex-grow-1', template === 'full');

  const $RenderSimplePage = Object.assign($page, {
    $title,
    $content,
    $footer,
    render() {
      const $el = create(props.content, data, $content);
      if ($el) $content.append($el);
      $RenderSimplePage.render = () => {};
    },
  });

  return $RenderSimplePage;
}

type PageState<D> = PageObject | ((data: D) => PageObject);

export function Pages({
  lazy = 2,
  Template = SimplePage,
}: {
  lazy?: number;
  Template?: (props: PageObject, data: any) => PageElement;
} = {}) {
  const cache = new Map<PageState<any>, PageElement>();
  const history = new Map<PageState<any>, number>();
  let steps = 0;

  const $container = html`<div
    class="h-100 w-100 overflow-y-hidden"
    style="font-size: 3vh"
    tabindex="0"
  />`;

  return Object.assign($container, {
    load<T>(newState: PageState<T>, data: T) {
      //   console.log('load', cache.has(newState), data);
      let currentPage;
      if (cache.has(newState)) {
        // checks in cache
        currentPage = cache.get(newState)!;
      } else {
        const props = typeof newState === 'object' ? newState : newState(data);
        currentPage = Template(props, data);
        cache.set(newState, currentPage);
      }

      if (history.size > 0)
        // replace
        $container.insertBefore(currentPage, $container.firstChild);
      else $container.append(currentPage); // append
      currentPage.render();
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
    preload<T>(step: number, newState: PageState<T>, data: T) {
      if (step > lazy) return false; // do not preload more pages than necessary

      if (!cache.has(newState)) {
        // checks in cache
        const props = typeof newState === 'object' ? newState : newState(data);
        const page = Template(props, data);
        cache.set(newState, page);
        $container.append(page);
        page.render();
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

function create<T>(res: any, ...rest: [T, ...any]): null | string | Node {
  if (!res) return null;
  if (typeof res === 'string') return res;
  if (res instanceof Text) return res;
  if (res instanceof DocumentFragment) return res;
  if (res instanceof Element) return res;
  if (res instanceof d3.selection || res instanceof d3.transition)
    return (res as any).node();

  return create(res(...rest), ...rest);
}
