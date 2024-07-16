const fs = require('fs');
const path = require('path');

ENVIRONMENT_FILE_NAME = '.env';
DEVELOPMENT_ENVIRONMENT_FILE_NAME = '.env.development';
STAGING_ENVIRONMENT_FILE_NAME = '.env.staging';
PRODUCTION_ENVIRONMENT_FILE_NAME = '.env.production';

const envMapping = {
  dev: DEVELOPMENT_ENVIRONMENT_FILE_NAME,
  staging: STAGING_ENVIRONMENT_FILE_NAME,
  prod: PRODUCTION_ENVIRONMENT_FILE_NAME,
};

const envArg = process.argv[2];

if (!envArg || !envMapping[envArg]) {
  console.error(
    `Please provide a valid environment: dev, staging, or prod. You have provided "${envArg}" which is not valid!`
  );
  process.exit(1);
}

const sourceEnvFile = path.join(__dirname, envMapping[envArg]);
const targetEnvFile = path.join(__dirname, ENVIRONMENT_FILE_NAME);

fs.access(targetEnvFile, fs.constants.F_OK, (err) => {
  if (!err) {
    fs.unlink(targetEnvFile, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Error deleting existing .env file: ${unlinkErr}`);
        process.exit(1);
      }
      copyEnvFile();
    });
  } else {
    copyEnvFile();
  }
});

function copyEnvFile() {
  fs.copyFile(sourceEnvFile, targetEnvFile, (err) => {
    if (err) {
      console.error(`Error copying file: ${err}`);
      process.exit(1);
    }
    console.log(`Successfully set the environment to ${envArg}`);
  });
}
