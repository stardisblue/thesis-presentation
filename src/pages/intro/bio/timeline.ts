import { html } from 'htl';

export default html`<div
  style="display: flex; flex-flow: column wrap; align-content: flex-start;"
>
  <svg viewBox="0,0,550,40" height="40">
    <g
      transform="translate(0,38)"
      fill="none"
      font-size="10"
      font-family="sans-serif"
      text-anchor="middle"
    >
      <path
        class="domain"
        stroke="currentColor"
        d="M20.5,-6V0.5H510.5V-6"
      ></path>
      <g class="tick" opacity="1" transform="translate(20.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">1994</text>
      </g>
      <g class="tick" opacity="1" transform="translate(53.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">1996</text>
      </g>
      <g class="tick" opacity="1" transform="translate(85.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">1998</text>
      </g>
      <g class="tick" opacity="1" transform="translate(118.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2000</text>
      </g>
      <g class="tick" opacity="1" transform="translate(151.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2002</text>
      </g>
      <g class="tick" opacity="1" transform="translate(183.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2004</text>
      </g>
      <g class="tick" opacity="1" transform="translate(216.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2006</text>
      </g>
      <g class="tick" opacity="1" transform="translate(249.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2008</text>
      </g>
      <g class="tick" opacity="1" transform="translate(281.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2010</text>
      </g>
      <g class="tick" opacity="1" transform="translate(314.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2012</text>
      </g>
      <g class="tick" opacity="1" transform="translate(347.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2014</text>
      </g>
      <g class="tick" opacity="1" transform="translate(379.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2016</text>
      </g>
      <g class="tick" opacity="1" transform="translate(412.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2018</text>
      </g>
      <g class="tick" opacity="1" transform="translate(445.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2020</text>
      </g>
      <g class="tick" opacity="1" transform="translate(477.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2022</text>
      </g>
      <g class="tick" opacity="1" transform="translate(510.5,0)">
        <line stroke="currentColor" y2="-6"></line>
        <text fill="currentColor" y="-9" dy="0em">2024</text>
      </g>
    </g>
  </svg>
  <div style="position: relative; width: 550px; height: 1em;">
    <span style="position: absolute; left: 29px; top: 0px;"
      ><span
        title="Naissance"
        style="position: absolute; height: 10px; width: 10px; background-color: rgb(31, 119, 180); border-radius: 10px;"
      ></span>
      <div style="margin-left: 20px; margin-top: -2px; font-size: 20px">
        Naissance
      </div></span
    ><span style="position: absolute; left: 414px; top: 0px;"
      ><span
        title="Master"
        style="position: absolute; height: 10px; width: 10px; background-color: rgb(255, 127, 14); border-radius: 10px;"
      ></span>
      <div style="margin-left: 20px; margin-top: -2px; font-size: 20px">
        Master
      </div></span
    >
  </div>
</div>`;
