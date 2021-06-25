import { AxeConfig } from './axe-config.type'
export type InitConfig = {
  pages: string[] | [];
  title?: string;
  fileName?: string;
  resultsDir?: string;
  basicAuth?: { username: string; password: string } | null;
  axeConfig?: AxeConfig;
  viewport?: {
    width: string;
    height: string;
  };
}
