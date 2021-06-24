import { AnyObject } from './any-object.type';
export type AxeConfig = {
  reporter: string;
  branding?: {
    brand?: string;
    application?: string;
  };
  checks?: any[];
  rules?: any[];
  standards?: AnyObject;
  locale?: AnyObject;
  axeVersion?: string;
  disableOtherRules?: boolean;
  noHtml?: boolean;
};
