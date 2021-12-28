// ==UserScript==
// @name          bgm-tv-hover-more-info
// @name:zh       鼠标指向条目链接时显示更多信息
// @namespace     https://trim21.me/
// @description   在讨论贴中添加一个悬浮窗显示条目信息
// @version       0.0.3
// @author        Trim21 <i@trim21.me>
// @source        https://github.com/Trim21/bgm-tv-hover-info
// @supportURL    https://github.com/Trim21/bgm-tv-hover-info/issues
// @license       MIT
// @match         https://bgm.tv/group/topic/*
// @match         https://bangumi.tv/group/topic/*
// @match         https://chii.in/group/topic/*
// @require       https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @run-at        document-end
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "$"
const external_$_namespaceObject = $;
;// CONCATENATED MODULE: ./src/index.ts

const style = `
<style>
.d-block {
  display: block;
}
.d-flex {
  display: flex;
}

#popup {
  width: 30em;
  /*height: 15em;*/
  flex: auto;
  background: white;
  border: solid 1px black;
  position: absolute;
  padding: 0.5em;
  border-radius: 0.2em;
}
.tag .name {
  /*background-color: dodgerblue;*/
  /*color: white;*/
}

.popup-tags{
  display: block;
}

.tag {
  border-radius: 0.2em;
  border: solid 1px gray;
  padding: 0 0.3em;
}

.image {
  padding-right: 2px;
}

</style>
`;

function createPopup(subject) {
  var _subject$images;

  let rank = '';

  if (subject.rating.rank) {
    rank = `<p class="rateInfo">
<span class="starstop-s"><span class="starlight stars${Math.round(subject.rating.score)}"></span></span>
 <small class="fade">${subject.rating.score}</small> <span class="tip_j">(${subject.rating.total}人评分)</span>
</p>`;
  }

  let tags = '';

  if (subject.tags.length) {
    tags = "<div class='popup-tags'>" + subject.tags.sort((a, b) => b.count - a.count).slice(0, 10).map(value => `<span class="tag"><span class="name">${value.name}</span> <small>${value.count}</small></span>`).join('\n');
    tags += '</div>';
  }

  return `
<div class="d-flex">
  <span class="image d-block">
    <img src="${(_subject$images = subject.images) === null || _subject$images === void 0 ? void 0 : _subject$images.small}" class="cover" alt="${subject.name}">
  </span>
  <div class="d-block">
    <h3>${subject.name}</h3>
    <small class="grey">${subject.name_cn}</small>
    <p class="info tip"> ${subject.summary} </p>
  </div>
</div>

${rank}

${tags}
`;
}

async function main() {
  console.log(GM.info.script.name);
  external_$_namespaceObject('head').append(style);
  external_$_namespaceObject('a').each((i, e) => {
    if (isBangumiSubjectHref(external_$_namespaceObject(e).attr('href'))) {
      external_$_namespaceObject(e).on('mouseover', hoverHandler).on('mouseleave', leaveHandler);
    }
  });
}

function isBangumiSubjectHref(s) {
  if (!(s !== null && s !== void 0 && s.length)) return false;
  return s.startsWith('https://bgm.tv/subject/') || s.startsWith('https://bangumi.tv/subject/') || s.startsWith('https://chii.in/subject/');
}

async function leaveHandler() {
  external_$_namespaceObject('#popup').remove();
  console.log('leave');
}

async function hoverHandler() {
  const e = external_$_namespaceObject(this);
  const href = e.attr('href');

  if (!href) {
    return;
  }

  const url = new URL(href);
  const offset = e.offset();
  external_$_namespaceObject('body').append('<div id="popup"> loading </div>');
  const popup = external_$_namespaceObject('#popup').css({
    left: offset.left,
    top: offset.top + 40,
    position: 'absolute',
    'z-index': 1000
  });
  const subjectID = url.pathname.split('/').pop();

  if (!subjectID) {
    return;
  }

  const res = await fetch(`https://api.bgm.tv/v0/subjects/${subjectID}`);

  if (res.status > 400) {
    popup.html('not found');
    return;
  }

  const data = await res.json();
  let html = createPopup(data);

  if (res.redirected) {
    html = '条目被合并到此条目' + html;
  }

  popup.html(html);
}

main().catch(console.error);
/******/ })()
;