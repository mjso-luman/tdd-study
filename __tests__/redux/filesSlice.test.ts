import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchFiles, fileAdded } from "../../src/redux/reducers/filesSlice";
import { RootState, getStoreWithState } from "../../src/redux/store";
import MockAdapter from "axios-mock-adapter";
import { API_URL } from "../../src/fixtures/client";
import { GET_FILE_LIST } from "../../src/api/fileApi";
import Client from "../../src/fixtures/client";
import { files } from "../../src/fixtures/dummy";
import { getStateWithRole } from "../../test-utils";

const getFileListEnpoint = `${API_URL}${GET_FILE_LIST}`;

const mockStore = configureStore([thunk]);

describe("filesSlice", () => {
  describe("addFile w/mock redux store", () => {
    it("should add file", async () => {
      const store = mockStore({
        files: { error: null, status: "idle", files: [] },
      });
      await store.dispatch(
        fileAdded({ title: "newFile", desc: "new new", url: "aaaa", id: "199" })
      );
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0].type).toEqual("files/fileAdded");
      expect(actions[0].payload).toEqual({
        title: "newFile",
        desc: "new new",
        url: "aaaa",
        id: "199",
      });
    });
  });

  describe("fetchFiles w/full redux store", () => {
    let mock: MockAdapter;
    beforeAll(() => {
      mock = new MockAdapter(Client);
    });
    it("should update files to fetched files list", async () => {
      mock.onGet(getFileListEnpoint).reply(200, files);
      const state: RootState = getStateWithRole("admin");
      const store = getStoreWithState(state);

      await store.dispatch(fetchFiles());
      expect(store.getState().files.files).toEqual(files);
    });
    it("should be loading before fetching files list", async () => {
      mock.onGet(getFileListEnpoint).reply(200, files);
      const state: RootState = getStateWithRole("admin");
      const store = getStoreWithState(state);

      const action = store.dispatch(fetchFiles());
      expect(store.getState().files.status).toEqual("loading");
      await action;
      expect(store.getState().files.status).toEqual("succeeded");
    });
  });
});
