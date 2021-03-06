import React from 'react';
import { fireEvent, waitFor, act } from '@testing-library/react-native';
import { renderWithContext } from '../../../test-utils';
import MockAdapter from 'axios-mock-adapter';
import { API_URL } from '../../fixtures/client';
import fileApi, { GET_FILE_LIST, UPLOAD_FILE } from '../../api/fileApi';
import HomeScreen from './HomeScreen';
import Client from '../../fixtures/client';
import { files } from '../../fixtures/dummy';
import { getStateWithRole } from '../../../test-utils';
import RnFetchBlob from 'rn-fetch-blob';

jest.mock(
  'rn-fetch-blob',
  () => {
    const mRNFetchBlob = {
      config: jest.fn(),
      fetch: jest.fn(),
      fs: {
        dirs: {
          DocumentDir: '',
          DownloadDir: '',
        },
      },
    };
    return mRNFetchBlob;
  },
  { virtual: true }
);

const getFileListEndpoint = `${API_URL}${GET_FILE_LIST}`;
const postUploadFileEndpoint = `${API_URL}${UPLOAD_FILE}`;

describe('HomeScreen', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(Client);
  });

  beforeEach(() => {
    mock.onGet(getFileListEndpoint).reply(200, files);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should have File Upload button', async () => {
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      screen.getByText('File Upload');
    });
  });

  it('should render file list', async () => {
    const files = [
      {
        id: 0,
        title: 'ABC',
        desc: 'abc',
        url: 'aljdfhasjkdhlasjdk',
      },
      {
        id: 1,
        title: 'DEF',
        desc: 'def',
        url: 'aljdfhasjkdhlasjdk',
      },
      {
        id: 2,
        title: 'GHI',
        desc: 'ghi',
        url: 'aljdfhasjkdhlasjdk',
      },
    ];

    mock.onGet(getFileListEndpoint).reply(200, files);
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      files.forEach((file) => {
        screen.getByText(file.title);
      });
    });
  });

  it('download button is visible only to admin', async () => {
    // mock.onGet(getFileListEndpoint).reply(200, files);

    // NOTE : role??? ?????? ???????????? 'general'??????, ????????? admin?????? ???????????? ????????? ??????.
    const screen = renderWithContext(<HomeScreen />, getStateWithRole('admin'));

    await waitFor(() => {
      expect(screen.getAllByText('download')).toBeTruthy();
      fireEvent.press(screen.getByText('General'));
      expect(screen.queryByText('download')).not.toBeTruthy();
    });
  });

  it('should show error info message on response error', async () => {
    mock.onGet(getFileListEndpoint).networkError();
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).toBeNull();
      screen.getByText('Something went wrong.');
    });
  });

  it('should show info text when the user is on waiting list', async () => {
    // mock.onGet(getFileListEndpoint).reply(200, files);
    mock
      .onPost(postUploadFileEndpoint)
      .reply(200, { status: 'waiting', waitingNumber: 3 });
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      const uploadButton = screen.getByTestId('upload-button');
      fireEvent.press(uploadButton);
      screen.getByText(/???????????? :/i);
    });
  });

  it('should call rnfetchblob config method to download image', async () => {
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      const downloadButton = screen.getByTestId('image-download-button');
      fireEvent.press(downloadButton);
      expect(RnFetchBlob.config).toBeCalledTimes(1);
    });
  });
  it.todo('should call download function with parameter');

  it('should call postUploadFile on file upload', async () => {
    mock
      .onPost(postUploadFileEndpoint)
      .reply(200, { status: 'waiting', waitingNumber: 3 });

    const spyFn = jest.spyOn(fileApi, 'postUploadFile');
    const screen = renderWithContext(<HomeScreen />);
    await waitFor(() => {
      const uploadButton = screen.getByTestId('upload-button');
      fireEvent.press(uploadButton);
      expect(spyFn).toBeCalled();
    });
  });
});
