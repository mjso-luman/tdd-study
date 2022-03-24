import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Tabs from '../atoms/Tabs';
import BasicTemplate from '../templates/BasicTemplate';
import { tabs } from '../../fixtures/tabs';
import Button from '../atoms/Button';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { updateRole, selectUser } from '../../redux/reducers/userSlice';
import { useQuery } from 'react-query';
import FileApi from '../../api/fileApi';
import Dashboard from '../molecules/DownloadFile';
import { launchImageLibrary } from 'react-native-image-picker';

const HomeScreen = () => {
  const {
    isLoading,
    error,
    data: files,
  } = useQuery('fetchFiles', FileApi.fetchFileList);

  // console.log("?? ", files);

  const dispatch = useAppDispatch();
  const { role } = useAppSelector(selectUser);
  // const files = useAppSelector(selectAllFiles);
  // const fileStatus = useAppSelector((state) => state.files.status);
  // const error = useAppSelector((state) => state.files.error);
  const [selectedTab, setSelected] = useState(role);
  const [info, setInfo] = useState('');
  // const [photo, setPhoto] = useState<ImagePickerResponse>();

  // useEffect(() => {
  //   if (fileStatus === "idle") {
  //     dispatch(fetchFiles());
  //   }
  // }, [fileStatus, dispatch]);

  const handleClick = (id: string) => {
    setSelected(id === 'admin' ? 'admin' : 'general');
    dispatch(updateRole(id === 'admin' ? 'admin' : 'general'));
  };

  const handleFileUploadClick = async () => {
    // await launchImageLibrary(
    //   { selectionLimit: 1, mediaType: 'photo' },
    //   async (res) => {
    //     if (res) {
    //       // setPhoto(res);
    //       console.log('RES? ', res);
    //       const data: any = new FormData();
    //       res.assets?.forEach((asset) => {
    //         const temp = {
    //           name: asset.fileName,
    //           type: asset.type,
    //           uri:
    //             Platform.OS === 'android'
    //               ? asset.uri
    //               : asset.uri?.replace('file://', ''),
    //         };
    //         data.append('images', temp);
    //       });
    //       const response = await postUploadFile(data);
    //       if (!response?.data) {
    //         const { status } = response.data;
    //         if (status === 'waiting') {
    //           setInfo(
    //             `4명 이상이 업로드 중입니다. 대기번호 :  ${response.data.waitingNumber}`
    //           );
    //         } else if (status === 'upload-available') {
    //           // TODO : upload file
    //         }
    //       }
    //     }
    //   }
    // );

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log("[INFO] File Selection Result : ", result);

    const response = await FileApi.postUploadFile({ data: 'test' });
    if (response?.data) {
      const { status } = response.data;
      if (status === 'waiting') {
        setInfo(
          `4명 이상이 업로드 중입니다. 대기번호 :  ${response.data.waitingNumber}`
        );
      } else if (status === 'upload-available') {
        // TODO : upload file
      }
    }
  };

  let content;

  if (isLoading) {
    content = <ActivityIndicator testID="loading-indicator" size="large" />;
  } else {
    if (error) {
      content = (
        <View>
          <Text>Something went wrong.</Text>
          <Text>[ERROR] : {(error as Error).message}</Text>
        </View>
      );
    } else {
      content = (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Files List</Text>
          {files?.data?.map((file: any) => (
            <View key={file.id} style={styles.item}>
              <Text>
                {file.title} <Text style={{ fontSize: 10 }}>{file.desc}</Text>
              </Text>
              {role === 'admin' ? (
                <Button
                  title="download"
                  onPress={() => {
                    console.log('download ', file.title);
                  }}
                  height={25}
                  fontSize={12}
                  testId={`download-button-${file.title}`}
                />
              ) : null}
            </View>
          ))}
        </View>
      );
    }
  }

  return (
    <BasicTemplate>
      <Tabs selected={selectedTab} tabs={tabs} handleClick={handleClick} />
      <View>
        <View style={styles.buttonContainer}>
          <Button
            title="File Upload"
            onPress={handleFileUploadClick}
            testId="upload-button"
          />
          {!!info && <Text style={styles.info}>{info}</Text>}
        </View>
        {content}
        <Dashboard />
      </View>
    </BasicTemplate>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    display: 'flex',
    padding: 15,
  },
  info: {
    width: '100%',
    height: 30,
    fontSize: 15,
    padding: 15,
    textAlign: 'center',
  },
  listContainer: {
    padding: 15,
    display: 'flex',
  },
  listTitle: {
    fontSize: 20,
    padding: 10,
  },
  item: {
    padding: 15,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    height: 60,
  },
});
