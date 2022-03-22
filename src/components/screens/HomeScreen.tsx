import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Tabs from "../atoms/Tabs";
import BasicTemplate from "../templates/BasicTemplate";
import { tabs } from "../../fixtures/tabs";
import Button from "../atoms/Button";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { updateRole, selectUser } from "../../redux/reducers/userSlice";
import { selectAllFiles, fetchFiles } from "../../redux/reducers/filesSlice";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector(selectUser);
  const files = useAppSelector(selectAllFiles);
  const fileStatus = useAppSelector((state) => state.files.status);
  const error = useAppSelector((state) => state.files.error);
  const [selectedTab, setSelected] = useState(role);

  useEffect(() => {
    if (fileStatus === "idle") {
      dispatch(fetchFiles());
    }
  }, [fileStatus, dispatch]);

  const handleClick = (id: string) => {
    setSelected(id === "admin" ? "admin" : "general");
    dispatch(updateRole(id === "admin" ? "admin" : "general"));
  };

  const handleFileUploadClick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("[INFO] File Selection Result : ", result);
  };

  let content;

  if (fileStatus === "loading") {
    content = <ActivityIndicator testID="loading-indicator" />;
  } else if (fileStatus === "succeeded") {
    content = (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Files List</Text>
        {files?.map((file) => (
          <View key={file.id} style={styles.item}>
            <Text>
              {file.title} <Text style={{ fontSize: 10 }}>{file.desc}</Text>
            </Text>
            {role === "admin" ? (
              <Button
                title="download"
                onPress={() => {
                  console.log("download ", file.title);
                }}
                height={25}
                fontSize={12}
              />
            ) : null}
          </View>
        ))}
      </View>
    );
  } else if (fileStatus === "failed") {
    content = (
      <View>
        <Text>Something went wrong.</Text>
        <Text>[ERROR] : {error}</Text>
      </View>
    );
  }

  return (
    <BasicTemplate>
      <Tabs selected={selectedTab} tabs={tabs} handleClick={handleClick} />
      <View>
        <View style={styles.buttonContainer}>
          <Button title="File Upload" onPress={handleFileUploadClick} />
        </View>
        {content}
      </View>
    </BasicTemplate>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    display: "flex",
    padding: 15,
  },
  listContainer: {
    padding: 15,
    display: "flex",
  },
  listTitle: {
    fontSize: 20,
    padding: 10,
  },
  item: {
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    height: 60,
  },
});
