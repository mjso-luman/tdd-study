import Client from "../fixtures/client";
import { files } from "../fixtures/dummy";
export const GET_FILE_LIST = "/files";

export const fetchFileList = async () => {
  try {
    const res = await Client.get(GET_FILE_LIST);
    return res;
  } catch (e) {
    // TODO : 서버단 구현이 안돼있을 땐 이 부분은 어떻게 해야 하는가?
    return { data: files };
  }
};
