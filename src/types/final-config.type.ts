import { InitConfig } from './init-config.type';

export type FinalConfig = InitConfig & {
  title: string;
  fileName: string;
  resultsDir: string;
  viewport: {
    width: string;
    height: string;
  };
}
