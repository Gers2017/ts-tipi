class TsProject {
  /**
   * TsProject
   * @param {string} projectName Name of the project
   * @param {TemplateConfig} template The template chosen by the user
   * @param {string} cwd The current working directory of the user
   */
  constructor(projectName, template, cwd) {
    this.projectName = projectName;
    this.template = template;
    this.cwd = cwd;
  }
  /**
   * getTemplatePath
   * @returns {string}
   */
  getTemplatePath() {
    return this.template.path;
  }

  /**
   * isTemplateOfType
   * @param templateName
   * @returns {boolean}
   */
  isTemplateOfType(templateName) {
    return this.template.name === templateName;
  }
}

module.exports = { TsProject };
