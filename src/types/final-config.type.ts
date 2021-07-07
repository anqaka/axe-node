import { InitConfig } from './init-config.type';
import { AxeConfig } from './axe-config.type';

export type FinalConfig = InitConfig & {
  title: string;
  fileName: string;
  resultsDir: string;
  axeConfig: AxeConfig;
  viewport: {
    width: string;
    height: string;
  };
};
