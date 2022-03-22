import { ScrollView, StyleSheet } from "react-native";
import theme from "../../fixtures/theme";

const BasicTemplate = ({ children }: any) => {
  return <ScrollView style={styles.root}>{children}</ScrollView>;
};

export default BasicTemplate;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: theme.backgroundColor,
  },
});
