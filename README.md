# ts-tipi
A CLI tool to quickly create typescript projects in node.js

## How to get started
Run the following commands to create a new project
```bash
npx ts-tipi
```
Choose between the tamplate options
- nodemon-watch: `tsc --w and nodemon`
- ts-node: `ts-node and nodemon`

Once it's done run the following commands:

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
### Instructions for nodemon-watch
To watch the files using tsc --w
```bash
npm run watch
#or
yarn watch
```
To start nodemon, in another terminal run:
```bash
npm run dev
#or
yarn dev
```
### Instructions for ts-node
Runs ts-node everytime a ts file changes
```bash
npm run dev
#or
yarn dev
```
