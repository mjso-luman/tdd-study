import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const loginText = 'Login';

describe('LoginScreen', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('should have login button', () => {
    const { getByText } = render(<LoginScreen />);

    getByText(loginText);
  });

  it('should go to Home on login button click', async () => {
    const { getByText } = render(<LoginScreen />);

    const loginButton = getByText(loginText);

    fireEvent.press(loginButton);

    expect(mockedNavigate).toBeCalledWith('Home');
  });
});
