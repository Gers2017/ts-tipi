class TemplateConfig {
  /**
   * TemplateConfig
   * @param {string} name Name of the template
   * @param {string} path Path of the template
   * @param  {string[]} filesToReplace
   */
  constructor(name, path, filesToReplace) {
    this.name = name;
    this.path = path;
    this.filesToReplace = filesToReplace;
  }

  /**
   * getFileToReplace
   * @param fileName
   * @returns {string | null}
   */
  getFileToReplace(fileName) {
    return this.filesToReplace.find((fr) => fr === fileName) || null;
  }
}

module.exports = {
  TemplateConfig,
};
