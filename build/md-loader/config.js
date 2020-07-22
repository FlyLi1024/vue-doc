const Config = require("markdown-it-chain");
// const anchorPlugin = require('markdown-it-anchor');
const slugify = require("transliteration").slugify;
const containers = require("./containers");
const overWriteFenceRule = require("./fence");
const config = new Config();

config.options
  .html(true)
  .end()
  .plugin("anchor")
  // .use(anchorPlugin, [
  //   {
  //     level: 3,
  //     slugify: slugify,
  //     permalink: true,
  //     permalinkBefore: true,
  //     permalinkSymbol: '✨',
  //     permalinkHref: (n) => {
  //       return '#' + n;
  //     },
  //   },
  // ])
  .before("toc")
  .end()
  .plugin("containers")
  .use(containers)
  .end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
