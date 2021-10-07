const { filesToIgnore, directoriesToIgnore } = require("./ignore");
const { readFileSync, mkdirSync, Stats } = require("fs");
/**
 * getFileContents
 * @param {string} path The path of the file to get the contents from
 * @returns
 */
function getFileContent(path) {
  return readFileSync(path, {
    encoding: "utf8",
  });
}
/**
 * makeDirectory
 * @param {string} path The path of the directory to create
 */
function makeDirectory(path) {
  mkdirSync(path);
}
/**
 * isFileToIgnore
 * @param {string} file Name of the file to compare if it should be ignored
 * @returns
 */
function isFileToIgnore(file) {
  return filesToIgnore.includes(file);
}
/**
 * isDirectoryToIgnore
 * @param {string} file Name of the directory to compare if it should be ignored
 * @returns
 */
function isDirectoryToIgnore(dir) {
  return directoriesToIgnore.includes(dir);
}
/**
 * isFile
 * @param {Stats} stats
 * @returns {boolean}
 */
function isFile(stats) {
  return stats.isFile();
}
/**
 * isDirectory
 * @param {Stats} stats
 * @returns {boolean}
 */
function isDirectory(stats) {
  return stats.isDirectory();
}

module.exports = {
  getFileContent,
  makeDirectory,
  isDirectoryToIgnore,
  isFileToIgnore,
  isFile,
  isDirectory,
};
