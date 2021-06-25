import { MetadataObj } from './metadata-obj.type';
export type AxeConfig = {
  reporter: string;
  branding?: {
    brand?: string;
    application?: string;
  };
  checks?: any[];
  rules?: any[];
  standards?: MetadataObj;
  locale?: MetadataObj;
  axeVersion?: string;
  disableOtherRules?: boolean;
  noHtml?: boolean;
};
