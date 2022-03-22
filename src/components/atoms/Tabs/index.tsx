import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../../fixtures/theme";

type TabProps = {
  id: string;
  title: string;
};

type TabsProps = {
  tabs: TabProps[];
  selected: string;
  handleClick: any;
};

const Tabs = ({ tabs, handleClick, selected }: TabsProps) => {
  return (
    <View style={styles.root}>
      {tabs?.map((tab) => {
        const { id, title } = tab;
        return (
          <TouchableOpacity
            style={styles.tabWrapper}
            onPress={() => handleClick(id)}
            key={id}
          >
            <View
              style={[
                styles.tabWrapper,
                selected === id ? styles.selectedTab : null,
              ]}
              key={id}
            >
              <Text style={styles.tabTitle}>{title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  tabWrapper: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    minWidth: 100,
    height: "100%",
    backgroundColor: theme.tabColor,
    flex: 1,
    flexDirection: "row",
  },
  selectedTab: {
    borderBottomColor: theme.activeColor,
    borderBottomWidth: 5,
  },
  tabTitle: {
    flex: 1,
    height: "100%",
    display: "flex",
    lineHeight: 60,
    textAlign: "center",
  },
});
