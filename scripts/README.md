# Scripting

This directory contains scripts that are used to automate various tasks. The scripts are written in Typescript. 

They fully work with:
- alias imports like "~";
- configurable env variables;
- confirmation dialogs
- esm compatibility

The scripts are placed in the `scripts` directory. And you can run them through your package.json scripts.

The main script that sets everything up for other scripts is located in `scripts/setup.ts` and it does the following:
- sets up the environment variables using `dotenv`
- asks for confirmation before running the scripts if required

Your `package.json` contains the following scripts:
```json
"scripts": {
    "execute": "node --no-warnings --experimental-specifier-resolution=node --loader ./scripts/loader.js",
    "script": "npm run execute scripts/setup.ts",
}
```

## execute

This script uses node loaders to run the scripts, due to issues with ts-node and esm compatibility. It is used to run the scripts by
using a custom loader located in `scripts/loader.js`. This allows for the alias `~` to be used in the scripts. 

## script

This script is used to run the scripts. It uses the `execute` script to run the `scripts/setup.ts` script. This script sets up the environment
variables and asks for confirmation before running the scripts if required.

This is configurable and is set by this part of the code: 

```ts
const ENVIRONMENTS = ["stage", "prod", "test"];

const getEnvInfo = () => {
  // Gets the environment from the command line arguments if set, otherwise defaults to dev
  const env = process.argv.find((arg) => ENVIRONMENTS.includes(arg)) ?? "";
  // Sets the environment name to be console logged for info
  const envName = env !== "" ? env : "dev";
  // Allows for reading from .env .env.prod .env.stage etc
  const path = `.env${env ? `.${env}` : ""}`;
  return { env, envName, path };
};

const setupEnv = () => {
  const { envName, path } = getEnvInfo();
  console.log(chalk.green(`Loading environment: ${envName}`));
  dotenv.config({ path });
  console.log(
    `Environment loaded: ${chalk.green(envName)} from ${chalk.green(path)}`
  );
};
```

You can test this out by adding `.env` and `.env.test` to you root directory and adding the following to the `.env.test` file:

```env
TEST=This is an env var from .env.test
```
 
 And in your `.env` file add the following:
  
```env
TEST=This is an env var from .env
```

Then inside of `getEnvInfo` function add the following console log:

```ts
console.log(process.env.TEST);
```

then run the following script:

```bash
npm run script test
```

and you should see the following output:

```bash 
This is an env var from .env.test 
```

and running:

```bash
npm run script
```

you should see the following output:

```bash
This is an env var from .env
```


After this is done the script checks for the presence of the `confirm` parameter in the command line arguments. If it is present, it will ask for confirmation before running the script.

So if you want to confirm a script (eg database seed) before running it you can do:

```bash
npm run script \"scripts/your-command.ts\" confirm 
```

This will ask for confirmation before running the script `your-command.ts`.

This is useful for scripts that can have a big impact on the application like database seeding, deleting files etc.

## Script examples

Here are some examples of scripts that you can run:

```bash
Runs with .env vars and no confirmation
npm run script scripts/your-command.ts
```

```bash
Runs with .env vars and confirmation
npm run script scripts/your-command.ts confirm
```

```bash
Runs with .env.test vars and confirmation
npm run script scripts/your-command.ts test confirm
```

```bash
Runs with .env.stage vars and confirmation
npm run script scripts/your-command.ts stage confirm
```

```bash
Runs with .env.prod vars and confirmation but runs a third-party script
npm run script \"npx prisma migrate dev\" prod confirm
```

 