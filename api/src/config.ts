import { Logger } from '@nestjs/common';
const chalk = require('chalk');

// import chalk from 'chalk';

const logger = new Logger('Configuration');

export class Config {
  public get(key: string): any {
    return process.env[key];
  }
}

logger.log(
  chalk.blueBright(
    `Actual process.env.SERVER_ENV value: ${process.env.NODE_ENV}`,
  ),
);
logger.log(
  chalk.blueBright(
    'Standard allowed values are: development, test or production',
  ),
);
const config = new Config();
export { config };
