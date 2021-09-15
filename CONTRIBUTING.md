# Contributing to Ts-tipi 🦝
> CLI tool to quicly create typescript projects on nodejs

🚀🌕🎉Hey thanks for taking the time to read the contribution guide!🚀🌕🎉

#### Table Of Contents
[What should I do before getting started](#what-should-i-do-before-getting-started)
- [Project setup](#project-setup)

[Contributing](#contributing)
- [I want to suggest a feature](#i-want-to-suggest-a-feature)
- [Pull request process](#pull-request-process)


[Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [JavaScript Styleguide](#javascript-styleguide)


[Code of Conduct](#code-of-conduct)
- [What is expected from a contributor](#what-is-expected-from-a-contributor)

## What should I do before getting started
### Project setup
To setup the project on your local enviroment please follow these steps:
- Clone the repository to your local environment
- Make sure you have node v14.16 or newest
- Install the dependencies using `npm i` or `yarn` (you don't have to install template's dependencies)
- That's all you're free to continue

## Contributing

### I want to suggest a feature
Before creating a feature suggestion please check if there's already a similar suggestion on the issues.

To suggest a new feature please raise an issue with the name of your feature with the tag `feature`.

Follow the following guides to create a feature suggestion otherwise your suggestion may be ignored
- Use a clear and descriptive title
- Avoid issue duplication
- Include as many details as possible
- Use a clear language and respectfull language
- Provide specific examples of how the feature works
- Provide screenshots if possible


#### Your sugggestion should have the following shape
```bash
# Why do you want this feature?
# How does this feature would be useful to the project?
# How relevant is this feature for the project?
# Examples (if needed)
```

### Pull request process
The pull request process has some goals
- Improve the project's quality
- Facilitate the use of the tool to the end user
- Keep or enhance the quality of the code

#### Your pull request should contain the following:
- Use a clean and descriptive title for the changes
- The description should have a list of the most important changes made
- The title should include the issue it's solving, example: `Super cool feature: #22969`
- Include examples or screenshots (optional)

Title:
```bash
Use async awit: #22969
```
Description:
```bash
Issue: #22969
Changes:
* Fix typo
* Replace promises with async await
* Create main async function
```

## Styleguides
### Git Commit Messages
- Commit messages should not exceed 60 characters
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")

### JavaScript Styleguide
* Prefer the object spread operator `({...anotherObj})` to `Object.assign()`
* Prefer the .map, .filter, .reduce, etc functions over for loops
* Prefer the javascript convention of leaving first bracket in the same line like this:
```bash
function Sum(a, b){
 return a + b;
}
```

## Code of conduct
### What is expected from a contributor

Contributors should excel at creating a positive environment and avoid unacceptable behaviors.

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting
