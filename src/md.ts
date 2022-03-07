import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import template from "./template";

const options: marked.MarkedOptions = {
  highlight: function (code, language, callback) {
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
};

function createmd() {
  return template(
    function (string) {
      const root = document.createElement("div");
      root.innerHTML = marked(string, options).trim();
      return root;
    },
    function () {
      return document.createElement("div");
    }
  );
}

export default createmd();
