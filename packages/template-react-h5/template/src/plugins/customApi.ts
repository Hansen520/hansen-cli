/*
 * @Date: 2023-12-04 13:43:32
 * @Description: description
 */
const pendingRequests: Array<string> = [];

export default function customApis() {
  function add(uuid: string) {
    if (uuid) pendingRequests.push(uuid);
  }

  function cancel() {
    if (pendingRequests.length) pendingRequests.length = 0;
  }

  function getIndex(val: string) {
    return pendingRequests.findIndex((element) => element === val);
  }

  function remove(index: number) {
    pendingRequests.splice(index, 1);
  }

  return {
    add,
    remove,
    cancel,
    getIndex,
  };
}