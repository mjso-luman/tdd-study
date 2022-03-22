import { useEffect, useState } from "react";
import { fetchFileList } from "../api/fileApi";
// NOTE : 미사용 코드
const useFileList = () => {
  const [files, setFiles] =
    useState<{ title: string; id: number; desc: string; url: string }[]>();

  useEffect(() => {
    fetchFileList().then((res) => {
      if (!!res?.data) {
        setFiles(res.data);
      }
    });
  }, [fetchFileList]);

  return files;
};

export default useFileList;
