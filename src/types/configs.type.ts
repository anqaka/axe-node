import { RunOptions } from 'axe-core';

// AxeConfig = RunsOptions type from axe-core
type AxeConfig = RunOptions;

type PageConfig = {
  url: string;
  selector: string | null;
};

type InitConfig = {
  pages: PageConfig[];
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

type FinalConfig = InitConfig & {
  title: string;
  fileName: string;
  resultsDir: string;
  axeConfig: AxeConfig;
  viewport: {
    width: string;
    height: string;
  };
};

export { InitConfig, FinalConfig, PageConfig };
