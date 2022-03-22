import React from "react";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { renderWithContext } from "../../../test-utils";
import MockAdapter from "axios-mock-adapter";
import { API_URL } from "../../fixtures/client";
import { GET_FILE_LIST } from "../../api/fileApi";
import HomeScreen from "./HomeScreen";
import Client from "../../fixtures/client";
import { files } from "../../fixtures/dummy";
import { getStateWithRole } from "../../../test-utils";

const getFileListEnpoint = `${API_URL}${GET_FILE_LIST}`;

describe("HomeScreen", () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(Client);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should have File Upload button", async () => {
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      const button = screen.getByText("File Upload");
      expect(button).toBeTruthy();
    });
  });

  it("should render file list", async () => {
    const files = [
      {
        id: 0,
        title: "ABC",
        desc: "abc",
        url: "aljdfhasjkdhlasjdk",
      },
      {
        id: 1,
        title: "DEF",
        desc: "def",
        url: "aljdfhasjkdhlasjdk",
      },
      {
        id: 2,
        title: "GHI",
        desc: "ghi",
        url: "aljdfhasjkdhlasjdk",
      },
    ];

    mock.onGet(getFileListEnpoint).reply(200, files);
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      files.forEach((file) => {
        const listItem = screen.getByText(file.title);
        expect(listItem).toBeTruthy();
      });
    });
  });

  it("download button is visible only to admin", async () => {
    mock.onGet(getFileListEnpoint).reply(200, files);

    // NOTE : role의 원래 기본값은 'general'인데, 여기선 admin으로 세팅해서 테스트 해봄.
    const screen = renderWithContext(<HomeScreen />, getStateWithRole("admin"));

    await waitFor(() => {
      expect(screen.getAllByText("download")).toBeTruthy();
      fireEvent.press(screen.getByText("General"));
      expect(screen.queryByText("download")).not.toBeTruthy();
    });
  });

  test.todo("should show info modal when the user is on waiting list");
  test.todo("should show 'start download' modal when the waiting is end");
});
