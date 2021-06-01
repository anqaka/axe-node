const prepareIssues = (issuesArray) => {
  issuesArray.forEach((item, url) => {
    item.url = url
    item.category = item.id,
    item.process = 'TO DO'
  })
  return issuesArray
}

module.exports = prepareIssues
