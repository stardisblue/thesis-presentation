import { html } from 'htl';
import { PageObject } from '../../pages';
import googleUrl from './google-arts.png';
import museumworldUrl from './digital-museum.png';
import wikipediaUrl from './wikipedia.png';

export const histoire: PageObject = {
  title: "Un effort grandissant de numérisation de l'histoire",
  content: html`
    <h3>Mieux connaître et comprendre le passé</h3>
    <div class="flex">
      <figure>
        <img src="${googleUrl}" />
        <figcaption class="tc">
          Œuvres d'arts
          <small
            >[<a href="https://artsandculture.google.com/" target="_blank"
              >Arts&Culture, Google &copy;</a
            >]</small
          >
        </figcaption>
      </figure>
      <div class="pa1"></div>
      <figure>
        <img src="${museumworldUrl}" />
        <figcaption class="tc">
          Héritage culturel
          <small
            >[<a href="https://britishmuseum.withgoogle.com/" target="_blank"
              >The Museum of the World</a
            >]</small
          >
        </figcaption>
      </figure>
      <div class="pa1"></div>
      <figure>
        <img src="${wikipediaUrl}" />
        <figcaption class="tc">
          Individus
          <small
            >[<a href="https://en.wikipedia.org/wiki/Napoleon" target="_blank"
              >Napoleon, Wikipedia</a
            >]</small
          >
        </figcaption>
      </figure>
    </div>
  `,
};
