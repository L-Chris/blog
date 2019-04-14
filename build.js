const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')

const linkPrefix = 'https://github.com/L-Chris/blog/blob/master/'
const template = `
# Blog

> 记录一些工作中总结的方案，以及一些问题的解决方法

目录

`

const stream = fg.stream('**/*.md', {
  ignore: ['node_modules', 'README.md']
})

const entries = []

stream.on('data', entry => {
  if (!entry) return
  const parentName = entry.split('/')[0]
  const fileName = path.basename(entry, '.md')
  const index = entries.findIndex(_ => _.name === parentName)
  if (index < 0) {
    entries.push({
      name: parentName,
      children: [fileName]
    })
    return
  }
  entries[index].children.push(fileName)
})
stream.once('error', console.log)
stream.once('end', () => {
  const content = entries.reduce((pre, {name, children}) => {
    pre += `
- ${name}
${children.map(title => `  - [${title}](${linkPrefix}${name}/${title}.md)`).join('\n')}
`
    return pre
  }, template)
  fs.writeFileSync('README.md', content)
})