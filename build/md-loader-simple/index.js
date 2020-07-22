const hash = require('hash-sum');
const LRU = require('lru-cache');

// markdown-it 插件
const emoji = require('markdown-it-emoji');
const taskLists = require('markdown-it-task-lists');
const containers = require('./containers');

const md = require('markdown-it')({
  html: true
})
  .use(emoji)
  .use(taskLists)
  .use(containers);

// console.log(md.parse('## 标题'));

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  return `<div class="fli-code"><pre v-pre class="language-${token.info}"><code>${md.utils.escapeHtml(token.content)}</code></pre></div>`;
};
md.renderer.rules.hr = (tokens, idx) => {
  return `<div class="customize-hr"></div>`;
};
md.renderer.rules.link_open = (tokens, idx) => {
  return `<a href="${tokens[idx].attrs[0][1]}" target="_blank">`;
};
md.renderer.rules.blockquote_open = () => {
  return `<blockquote><span class="blockquote-start">❝</span>`;
};
md.renderer.rules.blockquote_close = () => {
  return `<span class="blockquote-end">❞</span></blockquote>`;
};
md.renderer.rules.heading_open = (tokens, idx) => {
  const h_start = tokens[idx].tag.trim();
  return `<${h_start} id="heading-${idx}" class="heading-title" anchor="${h_start}"><span class="prefix"></span><span class="content">`;
};
md.renderer.rules.heading_close = (tokens, idx) => {
  const h_end = tokens[idx].tag.trim();
  return `</span><span class="suffix"></span></${h_end}>`;
};

const cache = new LRU({ max: 1000 });
module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production';
  const file = this.resourcePath;
  const key = hash(file + src);
  const cached = cache.get(key);

  // 生产模式下构建时使用缓存以提高性能
  if (cached && (isProd || /\?vue/.test(this.resourceQuery))) {
    return cached;
  }

  const html = md.render(src);
  const res = `<template>\n` + `<div>${html}</div>\n` + `</template>\n`;
  cache.set(key, res);
  return res;
};
