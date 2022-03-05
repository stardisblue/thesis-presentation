import * as d3 from 'd3';
import { html } from 'htl';

export type PageObject = {
  template?: 'title' | 'full';
  [key: string]: string | Element | Function | undefined;
};

function createPageContainer() {
  const page = {
    $title: html`<h2 class="measure"></h2>`,
    $content: html`<div></div>`,
    $footer: html`<div class="pt5"></div>`,
  };

  return Object.assign(
    html`<div class="h-100 w-100" tabindex="0" style="padding: 5% 7%" />
      <div class="w-100 flex flex-column">
        ${page.$title} ${page.$content} ${page.$footer}
      </div>`,
    page
  );
}

export function Page({ lazy = true }: { lazy?: boolean } = {}) {
  const $page = createPageContainer();
  const $hidden = createPageContainer();

  const $container = html`<div class="h-100 w-100 helvetica" tabindex="0" style="font-size: 3vh"/>${$page}${$hidden}</div>`;

  return Object.assign($container, {
    update<T>(newstate: PageObject | ((data: T) => any), data: T) {
      function updatePage({ template = 'full', ...props }: PageObject) {
        $page.classList.toggle('items-center', template === 'title');

        $page.$title.replaceChildren(create(props.title, data));

        $page.$content.replaceChildren(create(props.content, data));
        $page.$content.classList.toggle('flex-grow-1', template === 'full');

        $page.$footer.replaceChildren(create(props.footer, data));

        return $container;
      }

      return typeof newstate === 'object'
        ? updatePage(newstate)
        : updatePage(newstate(data));
    },
    lazy<T>(newstate: PageObject | ((data: T) => any), data: T) {
      if (lazy) {
        function updatePage({ template = 'full', ...props }: PageObject) {
          $hidden.classList.toggle('items-center', template === 'title');

          $hidden.$title.replaceChildren(create(props.title, data));

          $hidden.$content.replaceChildren(create(props.content, data));
          $hidden.$content.classList.toggle('flex-grow-1', template === 'full');

          $hidden.$footer.replaceChildren(create(props.footer, data));

          return $container;
        }

        return typeof newstate === 'object'
          ? updatePage(newstate)
          : updatePage(newstate(data));
      }
    },
  });
}

function create<T>(res: any, data: T): string | Node {
  if (typeof res === 'string') return res;
  if (res instanceof Text) return res;
  if (res instanceof DocumentFragment) return res;
  if (res instanceof Element) return res;
  if (res instanceof d3.selection || res instanceof d3.transition)
    return (res as any).node();
  return create(res(data), data);
}
