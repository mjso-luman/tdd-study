import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./";

const onPress = jest.fn();

describe("Button", () => {
  afterEach(() => {
    onPress.mockClear();
  });

  it("should call onPress function on click", () => {
    const buttonText = "Test Button";
    const { getByText } = render(
      <Button title={buttonText} onPress={onPress} />
    );

    const button = getByText(buttonText);

    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onPress).toBeCalledTimes(1);
  });

  it("should not call onPress function on click when disabled", () => {
    const buttonText = "Test Button";
    const { getByText } = render(
      <Button title={buttonText} type="disabled" onPress={onPress} />
    );

    const button = getByText(buttonText);

    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onPress).toBeCalledTimes(0);
  });
});
