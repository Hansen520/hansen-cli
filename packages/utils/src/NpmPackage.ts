import fs from 'node:fs';
import fse from 'fs-extra';
// @ts-ignore
import npminstall from 'npminstall';
import { getLatestVersion, getNpmRegistry } from './versionUtils.js';
import path from 'node:path';

export interface NpmPackageOptions {
    name: string;
    targetPath: string;
}

class NpmPackage {

    name: string;
    version: string = '';
    targetPath: string;
    storePath: string;
    
    constructor(options: NpmPackageOptions) {
        this.targetPath = options.targetPath;
        this.name = options.name;

        this.storePath = path.resolve(options.targetPath, 'node_modules');
    }

    // 拿到最新的版本号
    async prepare() {
        if (!fs.existsSync(this.targetPath)) {
            fse.mkdirpSync(this.targetPath);
        }
        const version = await getLatestVersion(this.name);
        this.version = version;
    }

    // 安装的版本号 可以指定
    async install() {
        await this.prepare();

        // npminstall 安装包
        return npminstall({
            pkgs: [
                {
                    name: this.name,
                    version: this.version,
                }
            ],
            registry: getNpmRegistry(),
            root: this.targetPath
        });
    }

    // 文件的路径 将 / 替换为 +，因为 / 在文件路径中是不合法的
    get npmFilePath() {
        return path.resolve(this.storePath, `.store/${this.name.replace('/', '+')}@${this.version}/node_modules/${this.name}`);
    }

    // 判断这个目录是否存在，从而判断包又没有安装
    async exists() {
        await this.prepare();

        return fs.existsSync(this.npmFilePath);
    }

    // 用readJsonSync读取package.json文件
    async getPackageJSON() {
        if(await this.exists()) {
            return fse.readJsonSync(path.resolve(this.npmFilePath, 'package.json'))
        }
        return null;
    }

    async getLatestVersion() {
        return getLatestVersion(this.name);
    }

    // 更新最新的版本号
    async update() {
        const latestVersion = await this.getLatestVersion();
        return npminstall({
            root: this.targetPath,
            registry: getNpmRegistry(),
            pkgs: [
                {
                    name: this.name,
                    version: latestVersion,
                }
            ]
        });
    }
}

export default NpmPackage;
