import { axeTest } from './test';
import { axeConfigure } from'./configure';

function testWithAxe(customConfig) {
  axeTest(customConfig);
}
function configureWithAxe(customConfig) {
  axeConfigure(customConfig);
}

export default { testWithAxe, configureWithAxe }
