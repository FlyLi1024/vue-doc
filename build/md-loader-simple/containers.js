const container = require('markdown-it-container');

module.exports = (md) => {
  md.use(...createCustomBlock('success', 'success'))
    .use(...createCustomBlock('tip', 'tip'))
    .use(...createCustomBlock('info', 'info'))
    .use(...createCustomBlock('warning', 'warning'))
    .use(...createCustomBlock('danger', 'danger'));
  // .use(container, '标签:', {
  //   validate(params) {
  //     return params.trim().match(/^标签:\s*(.*)$/);
  //   },
  //   render(tokens, idx) {
  //     // const m = tokens[idx].info.trim().match(/^标签:\s*(.*)$/);
  //     // if (tokens[idx].nesting === 1) {
  //     //   const description = m && m.length > 1 ? m[1] : '';
  //     //   const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
  //     //   return `<doc-block>
  //     //     ${description ? `<div>${md.render(description)}</div>` : ''}
  //     //     `;
  //     // }
  //     return '<div class="label">自定义标签</div>';
  //   }
  // });
};

function createCustomBlock(klass, defaultTitle) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          return `<div class="custom-block custom-block-${klass}"><div class="custom-block-title">${info || defaultTitle}</div><div class="custom-block-content">`;
        } else {
          return `</div></div>`;
        }
      }
    }
  ];
}
