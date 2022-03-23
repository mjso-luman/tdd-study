import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import AppStackNavigator from './src/components/navigators/AppNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <AppStackNavigator />
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
