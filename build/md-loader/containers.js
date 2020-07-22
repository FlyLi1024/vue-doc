const mdContainer = require('markdown-it-container');
const emoji = require('markdown-it-emoji');

module.exports = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<doc-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--kad-demo: ${content}:kad-demo-->
        `;
      }
      return '</doc-block>';
    },
  })
    .use(...createContainer('success', 'SUCCESS'))
    .use(...createContainer('info', 'INFO'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    .use(...createContainer('tip', 'TIP'))
    .use(emoji);
};

function createContainer(klass, defaultTitle) {
  return [
    mdContainer,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          return `<div class="doc-${klass} custom-block-title"><p class="title">${info || defaultTitle}</p>\n`;
        } else {
          return `</div>\n`;
        }
      },
    },
  ];
}
