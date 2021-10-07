class TsProject {
  /**
   * TsProject
   * @param {string} projectName Name of the project
   * @param {TemplateConfig} template The template choosen by the user
   * @param {string} cwd The current working directory of the user
   */
  constructor(projectName, template, cwd) {
    this.projectName = projectName;
    this.template = template;
    this.cwd = cwd;
  }
  /**
   * getTemplatePath
   * @returns {string} Returns the template path based on given the template name
   */
  getTemplatePath() {
    return this.template.path;
  }
}

class TemplateConfig {
  /**
   * TemplateConfig
   * @param {string} name Name of the template
   * @param {string} path Path of the template
   */
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }
}

module.exports = { TsProject, TemplateConfig };
