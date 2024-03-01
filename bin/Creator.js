const chalk = require("chalk");
const { promisify } = require("util");
const ora = require("ora");
const path = require("path");
const Inquirer = require("inquirer");
const { getZhuRongRepo, getTagsByRepo } = require("./api");
const fsFile = require('fs')
const downloadGitRepo = require("download-git-repo"); // 不支持 Promise

class Creator {
  // 项目名称及项目目录
  constructor(projectName, projectPath) {
    this.projectName = projectName;
    this.projectPath = projectPath;
    // 改造 download-git-repo 支持 promise, 才能执行await微任务
    this.downloadGitRepo = promisify(downloadGitRepo);
  }
  /* loading 项目中 */
  async loading(message, fn, ...args) {
    try {
      // 执行函数，下载文件行为
      // console.log(fn, 25);
      let executeRes = fn && await fn(...args);
      // 加载成功
      spinner.succeed();
      return executeRes;
    } catch (error) {
      // 加载失败
      spinner.fail(chalk.redBright("请求失败，重新提取中, 请稍后..."));
      await this.sleep(2000);
      // 重新拉取
      return this.loading(message, fn, ...args);
    }
  }

  async download(repo, projectName) {
    // 模板下载地址
    const templateUrl = `github:Hansen520/${repo}`;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    const message = '下载模板中，请等待...';
    const spinner = ora(message);
    spinner.start(); // 开启加载
    const result = await this.loading(
      message,
      this.downloadGitRepo,
      templateUrl,
      projectName,
      (err) => {
        if(err) {
          console.log(err, '下载失败');
          spinner.fail();
          return;
        }
        spinner.succeed();
        console.log(chalk.cyan("下载成功"));
      }
    );
    return result;
  }

  /**
   * 睡觉函数
   * @param {Number} n 睡眠时间
   */
  sleep(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, n);
    });
  }

  /* 设置创建问题的回答 */
  async getQuestions(projectName) {
    return await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `package name: (${projectName})`,
        default: projectName,
      },
      {
        type: "input",
        name: "description",
        message: "description",
      },
      {
        type: "input",
        name: "author",
        message: "author",
      },
    ]);
  }

  // 获取模板信息及用户最终选择的模板
  async getRepoInfo() {
    // 获取组件下的仓库
    // let repoList = await getZhuRongRepo();
    // // 提取仓库名
    // const repos = repoList.map((item) => item.name);
    // 选取模板信息
    let { repo } = await Inquirer.prompt([
      {
        name: "repo", // 与返回值对应
        type: "list",
        message: chalk.cyan("请选择一个模板"),
        choices: [
          {
            name: "react-template",
          },
          {
            name: "react-h5-template",
          },
        ],
      },
    ]);
    return repo;
  }

  // 获取版本信息及用户选择的版本
  async getTagInfo(repo) {
    const tagList = await getTagsByRepo(repo);
    const tags = tagList.map((item) => item.name);
    // 选取版本信息
    const { tag } = await Inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "Please choose a version",
        choices: tags,
      },
    ]);
    console.log(tag, 106);
    return tag;
  }

  // 创建项目部分
  async create(projectName) {
    // 创建信息 -- 模板信息
    const repo = await this.getRepoInfo();
    // 标签信息 -- 版本信息
    // const tag = await this.getTagInfo(repo);
    // console.log(repo, tag, 108);
    await this.download(repo, projectName);

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log(" npm install\r\n");
    console.log(" npm run dev\r\n");
  }
}

module.exports = Creator;
