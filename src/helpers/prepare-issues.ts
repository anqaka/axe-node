import { MetadataObj } from './../types/metadata-obj.type';
import { IssueObj } from './../types/issue-obj.type';

const prepareIssues = (violations: any[], url: string) => {
  const noNodes = ({ nodes, ...rest }) => rest;
  let issuesArray:any[] = violations;
  try {
    if (issuesArray.length) {
      issuesArray.forEach((item: IssueObj) => {
        let singleMain = {
          id: `${item.id}`,
          testedUrl: url,
          status: 'TO DO',
          ...noNodes(item),
        }
        item.nodes.forEach((element:MetadataObj, index:number) => {
          let singleNodes = {
            ...element,
            uid: `${item.id}-${index}`,
          };
          const singleIssue = Object.assign({}, singleMain, singleNodes);
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
