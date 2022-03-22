import Client from "../fixtures/client";
import { files } from "../fixtures/dummy";
export const GET_FILE_LIST = "/files";

export const fetchFileList = async () => {
  try {
    const res = await Client.get(GET_FILE_LIST);
    return res;
  } catch (e) {
    // NOTE : 테스트 위해 임시로 dummy data 넘겨줌.
    return { data: files };
  }
};
