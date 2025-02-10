/*
 * @Date: 2024-12-30 17:35:07
 * @Description: description
 */
import { cosmiconfig, cosmiconfigSync } from 'cosmiconfig';
import path from 'node:path';

const explorer = cosmiconfigSync('xxx');

async function main() {
    const result = await explorer.search(path.join(import.meta.url, '../'));
    console.log(result?.config);
}

main();