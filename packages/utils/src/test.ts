import NpmPackage from './NpmPackage.js';
import { getLatestVersion, getNpmInfo, getNpmRegistry, getVersions } from './versionUtils.js';
import path from 'node:path';

async function main() {
    const pkg = new NpmPackage({
        targetPath: path.join(import.meta.dirname, '../aaa'),
        name: '@babel/core'
    });

    // 看一下这个包是否存在
    if (await pkg.exists()) {
        pkg.update();
    } else {
        pkg.install();
    }

    console.log(await pkg.getPackageJSON())
}

main();
