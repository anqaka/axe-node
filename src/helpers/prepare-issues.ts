import { MetadataObj } from './../types/metadata-obj.type';
import { ResponseObj } from './../types/response-obj.type';
import { IssueObj } from './../types/issue-obj.type';
const noNodes = ({ nodes, ...rest }) => rest;

const prepareIssues = (axeResponse: ResponseObj, url: string) => {
  try {
    const axeCallback = axeResponse
    let issuesArray:any[] = axeCallback.violations;

    if (issuesArray.length) {
      issuesArray.forEach((item: IssueObj) => {
        item.nodes.forEach((element:MetadataObj, index:number) => {
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
