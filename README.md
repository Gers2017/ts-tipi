# ts-tipi 🐺
> A cli tool to quickly create Typescript Projects in Node.js

### Table of contents

* [Quick start](#quick-start)
* [Template Options](#template-options)
  * [List of commands](#list-of-commands) 
  * [Basic Usage](#basic-usage)
  * [To run nodemon watching ts files](#to-run-nodemon-watching-ts-files)
  * [To run Typescript files using ts-node](#to-run-typescript-files-using-ts-node)
  * [To transpile to Javascript](#to-transpile-to-javascript)
  * [Tsc watch and nodemon setup](#tsc-watch-and-nodemon-setup)

## Quick start

Create a new project
```bash
npx ts-tipi
```

Pick a template
- `ts-template`
- `express`
- `apollo-server`

Access your project
```bash
cd <your-project-name>
```

Install the dependencies
```bash
npm i
# or 
yarn
```

Dev command
```bash
npm run dev
#or
yarn dev
```

## Template Options
Every template comes with:
* typescript
* ts-node
* ts-node-dev
* nodemon
* @types/node
* prettier

### List of commands
````bash
    "start": "node ./dist/index.js",
    "start:ts": "ts-node ./src/index.ts",
    "ts:build": "tsc",
    "ts:watch": "tsc --watch",
    "ts:nodemon": "nodemon ./dist/index.js",
    "dev": "ts-node-dev --respawn ./src/index.ts",
    "dev:nodemon": "nodemon ./src/index.ts"
````

### Basic Usage
To run ts-node-dev
```bash
npm run dev 
#or
yarn dev
```

### To run nodemon watching ts files
```bash
npm run dev:nodemon
#or
yarn dev:nodemon
```

### To run Typescript files using ts-node
 ````bash
 npm run start:ts
 # or
 yarn start:ts
 ````

### To transpile to Javascript
```bash
npm run ts:build 
#or
yarn ts:build
```

Then to run the compiled js files
```bash
npm run start
#or
yarn start
```

### Tsc watch and nodemon setup

Watch for changes in src/index.ts 
```bash
npm run ts:watch
#or
yarn ts:watch
```

Watch for changes in dist/index.js
```bash
npm run ts:nodemon
#or
yarn ts:nodemon
```
