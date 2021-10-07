/** @format */

const { filesToIgnore, directoriesToIgnore } = require("./ignore");
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
 * @param {string} dir Name of the directory to compare if it should be ignored
 * @returns
 */
function isDirectoryToIgnore(dir) {
  return directoriesToIgnore.includes(dir);
}

module.exports = {
  isDirectoryToIgnore,
  isFileToIgnore,
};
