import { html } from 'htl';

export function CoverPage(title: any, content: any, footer: any) {
  return html`<div class="h-100 w-100 flex items-center">
    <div class="w-100">
      <h2 id="title">${title}</h2>

      <div class="flex-grow-1" id="content">${content}</div>

      <div>${footer}</div>
    </div>
  </div>`;
}
export function TitlePage(title: string, content: any, page: number) {
  return html`<div class="h-100 w-100 flex flex-column">
    <h2 id="title">${title}</h2>

    <div class="flex-grow-1" id="content">${content}</div>

    <small class="gray tr" id="page">${page}</small>
  </div>`;
}
