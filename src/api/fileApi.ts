import Client from '../fixtures/client';
import { files } from '../fixtures/dummy';
export const GET_FILE_LIST = '/files';
export const UPLOAD_FILE = '/uploadFile';

const fetchFileList = async () => {
  const res = await Client.get(GET_FILE_LIST);
  return res;

  try {
    const res = await Client.get(GET_FILE_LIST);
    return res;
  } catch (e) {
    // NOTE : 테스트 위해 임시로 dummy data 넘겨줌.
    return { data: files };
  }
};

const postUploadFile = async (data: any) => {
  const res = await Client.post(UPLOAD_FILE, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export default { fetchFileList, postUploadFile };
