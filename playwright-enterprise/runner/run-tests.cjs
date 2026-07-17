const { spawnSync } = require('node:child_process');
const path = require('node:path');

const booleanValues = new Set(['true', 'false']);
const allowedEnvironments = new Set(['qa', 'uat', 'stage', 'prod']);

function printHelp() {
  console.log(`
Usage:
  node runner/run-tests.cjs [options] [playwright args]

Options:
  --portal                         Enable portal-compatible execution mode.
  --execution-id <id>              Set PORTAL_EXECUTION_ID.
  --env <qa|uat|stage|prod>        Set TEST_ENV.
  --grep <tag-or-pattern>          Pass --grep to Playwright.
  --project <name>                 Pass --project to Playwright.
  --workers <number>               Set WORKERS and pass --workers.
  --retries <number>               Set RETRIES and pass --retries.
  --headless <true|false>          Set HEADLESS.
  --headed                         Run headed by setting HEADLESS=false and passing --headed.
  --base-url <url>                 Set BASE_URL.
  --api-base-url <url>             Set API_BASE_URL.
  --username <value>               Set TEST_USERNAME.
  --password <value>               Set TEST_PASSWORD.
  --portal-output <path>           Set PORTAL_REPORTER_OUTPUT.
  --config <path>                  Playwright config path. Defaults to playwright.config.ts.
  --help                           Show this help.

Examples:
  node runner/run-tests.cjs --grep=@smoke --project=chromium
  node runner/run-tests.cjs --portal --execution-id=run-123 --grep=@reference --project=chromium
`);
}

function readOptionValue(rawArgs, index, name) {
  const current = rawArgs[index];
  const inlinePrefix = `${name}=`;

  if (current.startsWith(inlinePrefix)) {
    return { value: current.slice(inlinePrefix.length), consumed: 0 };
  }

  const next = rawArgs[index + 1];

  if (!next || next.startsWith('--')) {
    throw new Error(`Missing value for ${name}`);
  }

  return { value: next, consumed: 1 };
}

function readNumberOption(rawArgs, index, name) {
  const result = readOptionValue(rawArgs, index, name);
  const value = Number(result.value);

  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${name} must be a positive integer`);
  }

  return { value: String(value), consumed: result.consumed };
}

function parseArgs(rawArgs) {
  const options = {
    config: 'playwright.config.ts',
    env: {},
    playwrightArgs: []
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === '--') {
      options.playwrightArgs.push(...rawArgs.slice(index + 1));
      break;
    }

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--portal') {
      options.portal = true;
      options.env.PORTAL_MODE = 'true';
      continue;
    }

    if (arg === '--headed') {
      options.env.HEADLESS = 'false';
      options.playwrightArgs.push('--headed');
      continue;
    }

    if (arg === '--execution-id' || arg.startsWith('--execution-id=')) {
      const result = readOptionValue(rawArgs, index, '--execution-id');
      options.env.PORTAL_EXECUTION_ID = result.value;
      index += result.consumed;
      continue;
    }

    if (arg === '--env' || arg.startsWith('--env=')) {
      const result = readOptionValue(rawArgs, index, '--env');
      const value = result.value.toLowerCase();

      if (!allowedEnvironments.has(value)) {
        throw new Error('--env must be one of qa, uat, stage, prod');
      }

      options.env.TEST_ENV = value;
      index += result.consumed;
      continue;
    }

    if (arg === '--grep' || arg.startsWith('--grep=')) {
      const result = readOptionValue(rawArgs, index, '--grep');
      options.playwrightArgs.push(`--grep=${result.value}`);
      index += result.consumed;
      continue;
    }

    if (arg === '--project' || arg.startsWith('--project=')) {
      const result = readOptionValue(rawArgs, index, '--project');
      options.playwrightArgs.push(`--project=${result.value}`);
      index += result.consumed;
      continue;
    }

    if (arg === '--workers' || arg.startsWith('--workers=')) {
      const result = readNumberOption(rawArgs, index, '--workers');
      options.env.WORKERS = result.value;
      options.playwrightArgs.push(`--workers=${result.value}`);
      index += result.consumed;
      continue;
    }

    if (arg === '--retries' || arg.startsWith('--retries=')) {
      const result = readNumberOption(rawArgs, index, '--retries');
      options.env.RETRIES = result.value;
      options.playwrightArgs.push(`--retries=${result.value}`);
      index += result.consumed;
      continue;
    }

    if (arg === '--headless' || arg.startsWith('--headless=')) {
      const result = readOptionValue(rawArgs, index, '--headless');
      const value = result.value.toLowerCase();

      if (!booleanValues.has(value)) {
        throw new Error('--headless must be true or false');
      }

      options.env.HEADLESS = value;
      index += result.consumed;
      continue;
    }

    if (arg === '--base-url' || arg.startsWith('--base-url=')) {
      const result = readOptionValue(rawArgs, index, '--base-url');
      options.env.BASE_URL = result.value;
      index += result.consumed;
      continue;
    }

    if (arg === '--api-base-url' || arg.startsWith('--api-base-url=')) {
      const result = readOptionValue(rawArgs, index, '--api-base-url');
      options.env.API_BASE_URL = result.value;
      index += result.consumed;
      continue;
    }

    if (arg === '--username' || arg.startsWith('--username=')) {
      const result = readOptionValue(rawArgs, index, '--username');
      options.env.TEST_USERNAME = result.value;
      index += result.consumed;
      continue;
    }

    if (arg === '--password' || arg.startsWith('--password=')) {
      const result = readOptionValue(rawArgs, index, '--password');
      options.env.TEST_PASSWORD = result.value;
      index += result.consumed;
      continue;
    }

    if (arg === '--portal-output' || arg.startsWith('--portal-output=')) {
      const result = readOptionValue(rawArgs, index, '--portal-output');
      options.env.PORTAL_REPORTER_OUTPUT = result.value;
      index += result.consumed;
      continue;
    }

    if (arg === '--config' || arg.startsWith('--config=')) {
      const result = readOptionValue(rawArgs, index, '--config');
      options.config = result.value;
      index += result.consumed;
      continue;
    }

    options.playwrightArgs.push(arg);
  }

  return options;
}

function run() {
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  if (options.help) {
    printHelp();
    return;
  }

  const playwrightCli = path.resolve(__dirname, '..', 'node_modules', 'playwright', 'cli.js');
  const args = [playwrightCli, 'test', '--config', options.config, ...options.playwrightArgs];
  const result = spawnSync(process.execPath, args, {
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      ...options.env
    },
    stdio: 'inherit'
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

run();
