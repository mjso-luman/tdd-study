import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Dashboard = () => {
  const fileUrl = 'http://localhost:4001/download/lionking.jpeg';

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
            buttonPositive: 'aa',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          alert('Error: Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    const date = new Date();
    // File URL which we want to download
    const FILE_URL = fileUrl;
    // Function to get extention of the file url
    const fileExtensions = getFileExtention(FILE_URL);

    const file_ext = '.' + fileExtensions?.[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    // let RootDir = fs.dirs.PictureDir;
    const isIOS = Platform.OS == 'ios';
    const aPath = Platform.select({
      ios: fs.dirs.DocumentDir,
      android: fs.dirs.DownloadDir,
    });
    const fPath =
      aPath +
      '/file_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      file_ext;
    const options = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        //path: filePath,
        //appendExt: fileExt,
        notification: true,
      },
      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: fPath,
          description: 'Downloading xlsx...',
        },
      },
    });
    if (options) {
      config(options)
        .fetch('GET', FILE_URL)
        .progress({ count: 10 }, (written, total) => {
          console.log('downloading..', written / total);
        })
        .then((res) => {
          console.log('file url? ', FILE_URL);
          if (isIOS) {
            setTimeout(() => {
              RNFetchBlob.ios.previewDocument('file://' + res.path());
              //   RNFetchBlob.ios.openDocument(res.data);
              // Alert.alert(CONSTANTS.APP_NAME,'File download successfully');
            }, 300);
          } else {
            // NOTE : mime 타입 어떻게 처리 할 것인지.
            RNFetchBlob.android.actionViewIntent(res.path(), 'image');
          }

          // Alert after successful downloading
          console.log('res -> ', JSON.stringify(res.data));
          alert('File Downloaded Successfully.');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getFileExtention = (fileUrl: string) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          React Native File Download Example
        </Text>
      </View>
      <Image
        source={{
          uri: fileUrl,
        }}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'contain',
          margin: 5,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={checkPermission}>
        <Text style={styles.text}>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'blue',
    margin: 10,
  },
});
