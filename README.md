# ts-tipi 🐺
> A CLI tool to quickly create typescript projects in node.js

### Table of contents

* [How to get started](#how-to-get-started)
* [Simply running ts files](#simply-running-ts-files)
* [Instructions for nodemon-watch](#instructions-for-nodemon-watch)
* [Instructions for ts-node-dev](#instructions-for-ts-node-dev)
* [Compile to js](#compile-to-js)

## How to get started

Create a new project
```bash
npx ts-tipi
```

Pick a template
- **nodemon-watch**: `nodemon and ts-node`
- **ts-node-dev**: `ts-node-dev and ts-node`

Access your project
```bash
cd <project-name>
```

Install the dependencies
```bash
npm i
# or 
yarn
```

## Simply running ts files

By default every template has ts-node as a dependency.
Run the following command to run your ts files:
```bash
npm run start:ts
#or
yarn start:ts
```

## Instructions for nodemon-watch

Runs nodemon watching for changes inside the src folder
```bash
npm run dev
#or
yarn dev
```
## Instructions for ts-node-dev

Restarts everytime a ts file changes inside the src folder
```bash
npm run dev
#or
yarn dev
```

## Compile to js

Runs tsc to cimpile your ts files into js files inside the dist folder
```bash
npm run build
#or
yarn build
```
Then to run the compiled js files you could also run:
```bash
npm run start
#or
yarn start
```
