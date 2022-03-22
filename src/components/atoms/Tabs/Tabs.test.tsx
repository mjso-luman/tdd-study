import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import Tabs from "./";

const handleClick = jest.fn();

const tabs = [
  {
    id: "admin",
    title: "Admin",
  },
  {
    id: "general",
    title: "General",
  },
];

const renderTabs = () =>
  render(<Tabs tabs={tabs} handleClick={handleClick} selected="admin" />);

afterEach(cleanup);

describe("Tabs", () => {
  it("should render all tabs", () => {
    const { getByText } = renderTabs();

    const tabA = getByText("Admin");
    const tabB = getByText("General");

    expect(tabA).toBeTruthy();
    expect(tabB).toBeTruthy();
  });

  it("should call handler function on tab click", () => {
    const { getByText } = renderTabs();

    fireEvent.press(getByText("General"));
    expect(handleClick).toBeCalledTimes(1);
  });
});
