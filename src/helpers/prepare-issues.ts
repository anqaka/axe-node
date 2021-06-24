import { AnyObject } from './../types/any-object.type';
type IssueObject = AnyObject & {
  nodes: any[]
}
const prepareIssues = (axeResponse: AnyObject, url: string) => {
  try {
    const noNodes = ({ nodes, ...rest }) => rest;
    console.log('noNodes', noNodes);
    let issuesArray: any[] = [];
    const issues = axeResponse.violations;

    if (issues.length) {
      issues.forEach((item:IssueObject) => {
        item.nodes.forEach((element:AnyObject, index:number) => {
          const singleIssue = {
            uid: `${item.id}-${index}`,
            testedUrl: url,
            urlCategory: url,
            status: 'TO DO',
            ...noNodes(item),
            ...element,
          };
          issuesArray.push(singleIssue);
        });
      });
    }

    return issuesArray;
  } catch (err:any) {
    throw new Error(err);
  }
};

export default prepareIssues;
