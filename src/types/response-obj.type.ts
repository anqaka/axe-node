import { AxeConfig } from './axe-config.type';

export type ResponseObj = {
  url: string;
  viewposrWidth: 'string'
  violations: any[];
  passes?: any[];
  inapplicable?: any[];
  incomplete?: any[];
  testEngine: {name: string; version: string;};
  testRunner: {name: string;},
  testEnvironment: {
    userAgent: string;
    windowWidth: number;
    orientationAngle: number;
    orientationType: string;
    timestamp: string;
    url: string;
  },
  toolOptions: AxeConfig
}
