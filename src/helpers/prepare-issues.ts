import { MetadataObj } from './../types/metadata-obj.type';
import { IssueObj } from './../types/issue-obj.type';

const prepareIssues = (violations: any[], url: string) => {
  try {
    const noNodes = ({ nodes, ...rest }) => rest,
      issuesArray: any[] = violations,
      finalArray: any[] = [];
    if (issuesArray.length) {
      issuesArray.forEach((item: IssueObj) => {
        item.nodes.forEach((element: MetadataObj, index: number) => {
          const singleNode = {
            uid: `${item.id}-${index}`,
            id: item.id,
            ...element,
            ...noNodes(item),
            testedUrl: url,
            status: 'TO DO',
          };
          finalArray.push(singleNode);
        });
      });
    }
    return finalArray;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default prepareIssues;
