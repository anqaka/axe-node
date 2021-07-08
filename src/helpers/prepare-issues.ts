import { MetadataObj, IssueObj } from './../types/basic-objs.type';
import { PageConfig } from './../types/configs.type';

const prepareIssues = (violations: any[], page: PageConfig) => {
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
            testedUrl: page.url,
            selector: page.selector,
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
