import { InitConfig } from 'axe-node/src/types/init-config.type';

export type FinalConfig = InitConfig & {
  fileName: string;
  resultsDir: string;
  viewport: {
    width: string;
    height: string;
  };
}
