import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParams } from "../../types/navigator";
import BasicTemplate from "../templates/BasicTemplate";
import Button from "../atoms/Button";

type LoginScreenProp = StackNavigationProp<AppNavigatorParams, "Login">;

const LoginScreen = ({}) => {
  const navigation = useNavigation<LoginScreenProp>();

  return (
    <BasicTemplate>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          type="secondary"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </BasicTemplate>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
  },
});
