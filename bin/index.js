#! /usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const Inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs-extra");
const Creator = require("./Creator");

const downloadGitRepo = require("download-git-repo");

// /**
//  * loading加载效果
//  * @param {String} message 加载信息
//  * @param {Function} fn 加载函数
//  * @param {List} args fn 函数执行的参数
//  * @returns 异步调用返回值
//  */
// async function loading(message, fn, ...args) {
//   const spinner = ora(message);
//   spinner.start(); // 开启加载
//   let executeRes = await fn(...args);
//   spinner.succeed();
//   return executeRes;
// }

const program = new Command();
console.log(
  "\r\n" +
    figlet.textSync("welcome template", {
      font: "Doom",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 200,
      whitespaceBreak: true,
    })
);
// 直接使用该版本的属性
program.name("cil-test").version(`cil-test ${require("../package.json").version}`);

program.name("cil-test").usage(`<command> [option]`);
program.on("--help", function () {
  console.log();
  console.log(`Run ${chalk.cyan("cil-test <command> --help")} for detailed usage of given command`);
  console.log();
});

program
  .command("create <project-name>")
  .description("创建一个新工程")
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action(async (projectName, options) => {
    
    const creator = new Creator(projectName, __dirname + path.join("\\" + projectName));

    // 当前命令行执行的目录
    const cwd = process.cwd();
    // 需要创建的目录
    const targetPath = path.join(cwd, projectName);
    console.log(targetPath, 63);
    // 目录是否存在
    if (fs.existsSync(targetPath)) {
      console.log(`${chalk.cyan('错误: 该目录下存在一个相同的项目！')}`);
      // 判断是否使用 --force 参数
      if (options.force) {
        await fs.remove(targetPath); // 删除目录
      } else {
        // 询问用户是否需要强制创建
        const { isOverwrite } = await new Inquirer.prompt([
          {
            name: 'isOverwrite', // 与返回值对应
            type: "list", // list 类型
            message: chalk.cyan(`仓库路径${targetPath}已存在，请继续选择！`),
            choices: [
              {
                name: '覆盖',
                value: true
              },
              {
                name: '取消',
                value: false
              }
            ]
          }
        ]);
        if (!isOverwrite) {
          console.log(`${chalk.cyan('取消成功')}`);
          return;
        } else {
          console.log(`${chalk.cyan('移除中，请稍后...')}`);
          await fs.remove(projectName);
          console.log(`${chalk.cyan('移除成功')}`);
        }
      }
    } else {
      creator.create(projectName); // 创建项目
    }
  });

program.parse(process.argv);
