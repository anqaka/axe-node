import { AxeResults } from 'axe-core';

type MetadataObj = {
  [key: string]: any;
};

type IssueObj = MetadataObj & {
  nodes: any[];
};

type AuditObj = {
  title: string;
  violationsNo: number;
  violations: any[];
};

type ResponseObj = AxeResults;

export { MetadataObj, AuditObj, IssueObj, ResponseObj };
