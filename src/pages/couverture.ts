import { html } from "htl";
import logos from "../data/logos";
import jury from "../data/jury";
import type { PageObject } from "../pages";
import md from "../md";

const formatJury = jury.map(({ titre, name, qualite, labo, univ, status }) => [
  titre,
  name,
  [qualite, labo, univ].join(", "),
  status,
]);

const page: PageObject = {
  template: "title",
  title: html`Réduction de l'encombrement visuel : application à la
  visualisation et à l'exploration de données prosopographiques`,
  content: md`**Fati CHEN**

Directeur de thèse : **Pascal PONCELET**<br/>
Co-encadrant de thèse : **Arnaud SALLABERRY**

Le *DATE DE SOUTENANCE*

<table class="w-100" style="font-size:0.8em">
${formatJury.map((a) => `<tr><td>${a.join("</td><td>")}</td>`)}
  </table>`,
  footer: html`<div
    class="flex-grow-1"
    style="display:flex; justify-content: space-around"
  >
    ${logos.map(
      ({ url, ...attrs }) => html`<a
        href=${url}
        target="_blank"
        rel="noopener noreferrer"
        ><img height="64px" style="width:auto;" ${attrs} />
      </a> `
    )}
  </div>`,
};

export default page;
