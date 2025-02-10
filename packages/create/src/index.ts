/*
 * @Date: 2024-12-23 18:12:38
 * @Description: create
 */
import { select, input, confirm  } from '@inquirer/prompts';
import os from 'node:os';
import { NpmPackage } from '@hansen-cli/utils';
import path from 'node:path';
import ora from 'ora';
import fse from 'fs-extra';
import { glob } from 'glob';
import ejs from 'ejs';

async function create() {
    console.log('create 命令执行中...')

    const projectTemplate = await select({
        message: '请选择项目模板',
        choices: [
            {
                name: 'react 项目',
                value: '@hansen-cli/template-react'
            },
            {
                name: 'vue 项目',
                value: '@hansen-cli/template-vue'
            }
        ]
    });

    let projectName = '';

    while (!projectName) {
        projectName = await input({ message: '请输入项目名' })
    }

    const pkg = new NpmPackage({
        name: projectTemplate,
        targetPath: path.join(os.homedir(), '.hansen-cli-template')
    });
    console.log(projectTemplate, projectName);

    if (!await pkg.exists()) {
        const spinner = ora('正在下载模板...').start();
        await pkg.install();
        await sleep(1000);
        spinner.stop();
    } else {
        const spinner = ora('更新模板中...').start();
        await pkg.update();
        await sleep(1000);
        spinner.stop();
    }

    await sleep(1000);

    

    // 读取模板的 package.json
    const pkgPath = path.join(pkg.npmFilePath, 'package.json');
    const pkgContent = fse.readFileSync(pkgPath, 'utf-8');
    const pkgJson = JSON.parse(pkgContent);
    const { scripts } = pkgJson;

    // 修改 package.json
    pkgJson.name = projectName;
    pkgJson.scripts = scripts;

    // 将修改后的 package.json 写入文件
    fse.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2), 'utf-8');

    const templatePath = path.join(pkg.npmFilePath, 'template'); // 模版包都有个 template 目录，路径要拼接一下：
    const targetPath = path.join(process.cwd(), projectName);


    // 判断下当前的目录是否为空
    if (fse.existsSync(targetPath)) {
        const empty = await confirm({ message: '当前目录不为空，是否清空目录?'});
        console.log(empty, 61)
        if (empty) {
            fse.emptyDirSync(targetPath);
        } else {
            process.exit(0);
        }
    }

    const spinner = ora('创建项目中1...').start();
    await sleep(1000);

   

    // 将模板路径复制到当前路径
    fse.copySync(templatePath, targetPath);

    spinner.stop();

    /* 判断是否新增eslint, pr等新的工具 */
    const renderData: Record<string, any> = { projectName };
    const deleteFiles: string[] = [];

    const questionConfigPath = path.join(pkg.npmFilePath, 'questions.json'); // 判断是否有 questions.json 文件

    if (fse.existsSync(questionConfigPath)) {
        const config = fse.readJSONSync(questionConfigPath);
        console.log(config, 65);
        for (let key in config) {
            const res = await confirm({ message: '是否启用' + key });
            renderData[key] = res;

            if (!res) {
                deleteFiles.push(...config[key].files);
            }
        }
    }

     /* 递归读取模板的所有文件 */
     const files = await glob('**', {
        cwd: targetPath,
        nodir: true,
        ignore: 'node_modules/**'
    });

    console.log(files, 72)

    // 现在 template 里并没有 ejs 模版的语法，我们改下 template-vue、template-react 的 package.json
    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(targetPath, files[i]);
        const renderResult = await ejs.renderFile(filePath, renderData); // 这里要修改模板的template的package的name,<%= projectName %>，这里用ejs语法来修改
        fse.writeFileSync(filePath, renderResult);
        
    }

    deleteFiles.forEach(item => {
        fse.removeSync(path.join(targetPath, item));
    })

    console.log(`hansen-cli提醒您，创建项目成功：${targetPath}`);
    

    function sleep(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}

// create();

export default create;

