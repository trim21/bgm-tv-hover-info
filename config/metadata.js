const { author, dependencies, name, repository, version } = require('../package.json');

const match = [];

for (const m of ['/group/topic/*', '/index/*', '/rakuen/topiclist']) {
  match.push(...['bgm.tv', 'bangumi.tv', 'chii.in'].map((x) => `https://${x}${m}`));
}

module.exports = {
  name,
  'name:zh': '鼠标指向条目链接时显示更多信息',
  namespace: 'https://trim21.me/',
  description: '鼠标指向条目链接时弹出一个悬浮窗显示条目信息',
  version,
  author,
  source: repository.url,
  supportURL: repository.url + '/issues',
  license: 'MIT',
  match,
  require: [`https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`],
  'run-at': 'document-end',
};
