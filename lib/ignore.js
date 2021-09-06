const files_to_ignore = [
  "package-lock.json", "yarn.lock"
]

const directories_to_ignore = [
  "node_modules",
  "dist"
]

module.exports = {
  files_to_ignore,
  directories_to_ignore
}