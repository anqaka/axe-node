import { AxeConfig } from './axe-config.type';
export type InitConfig = {
  pages: { url: string; selector: string }[];
  title?: string;
  fileName?: string;
  resultsDir?: string;
  basicAuth?: { username: string; password: string } | null;
  axeConfig?: AxeConfig;
  viewport?: {
    width: string;
    height: string;
  };
  selector?: string | null;
};
