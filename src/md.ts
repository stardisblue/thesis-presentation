import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import template from './template';

const options: marked.MarkedOptions = {
  highlight: function (code, language) {
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
};

marked.setOptions(options);

function createmd() {
  return template(
    function (string) {
      const root = document.createElement('div');
      root.innerHTML = marked.parse(string).trim();
      return root;
    },
    function () {
      return document.createElement('div');
    }
  );
}
function createmdi() {
  return template(
    function (string) {
      const root = document.createElement('div');
      root.innerHTML = marked.parseInline(string).trim();
      return root;
    },
    function () {
      return document.createElement('div');
    }
  );
}

export default createmd();
export const mdi = createmdi();
