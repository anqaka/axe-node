import { AxeConfig } from 'axe-node/src/types/axe-config.type'
export type InitConfig = {
  pages: string[] | [];
  fileName?: string;
  resultsDir?: string;
  basicAuth?: { username: string; password: string } | null;
  axeConfig?: AxeConfig;
  viewport?: {
    width: string;
    height: string;
  };
}