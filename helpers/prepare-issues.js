const prepareIssues = (axeResponse, url) => {
  const noNodes = ({ nodes, ...rest }) => rest

  let issuesArray = []
  const issues = axeResponse.violations

  if (issues.length) {
    issues.forEach((item) => {
      item.nodes.forEach((element, index) => {
        const singleIssue = {
          uid: `${item.id}-${index}`,
          testedUrl: url,
          urlCategory: url,
          status: 'TO DO',
          ...noNodes(item),
          ...element
        }
        issuesArray.push(singleIssue);
      })
    })
  }

  return issuesArray
}

module.exports = prepareIssues
