const { author, dependencies, name, repository, version } = require('../package.json');

module.exports = {
  name: name,
  'name:zh': '鼠标指向条目链接时显示更多信息',
  namespace: 'https://trim21.me/',
  description: '在讨论贴中添加一个悬浮窗显示条目信息',
  version: version,
  author: author,
  source: repository.url,
  supportURL: repository.url + '/issues',
  license: 'MIT',
  match: ['https://bgm.tv/group/topic/*', 'https://bangumi.tv/group/topic/*', 'https://chii.in/group/topic/*'],
  require: [`https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`],
  'run-at': 'document-end',
};
