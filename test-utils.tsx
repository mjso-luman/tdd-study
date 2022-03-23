import { render as rtlRender } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';
import { RootState } from './src/redux/store';
import reducer from './src/redux/reducers';
import { QueryClient, QueryClientProvider } from 'react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
) {
  const store = configureStore({
    reducer,
    preloadedState: state,
  });
  const testQueryClient = createTestQueryClient();
  const utils = rtlRender(
    <QueryClientProvider client={testQueryClient}>
      <Provider store={store}>{element}</Provider>
    </QueryClientProvider>
  );
  return { store, ...utils };
}
export const getStateWithRole = (role: 'admin' | 'general'): RootState => {
  return {
    files: { error: null, status: 'idle', files: [] },
    user: { role: role },
  };
};
