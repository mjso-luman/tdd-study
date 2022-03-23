import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Client from '../../fixtures/client';

type File = {
  id: string;
  title: string;
  desc: string;
  url: string;
};

type FilesType = {
  files: File[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
};

const initialState: FilesType = {
  files: [],
  status: 'idle',
  error: null,
};

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await Client.get('/files');
  return response.data;
});

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    fileAdded: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    fileUpdated: (state, action: PayloadAction<File>) => {
      const { id, title, desc } = action.payload;
      const existingFile = state.files.find((file) => file.id === id);
      if (existingFile) {
        existingFile.title = title;
        existingFile.desc = desc;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // NOTE : action.payload로 오는 값은 file 데이타형식과 동일하게 맞춰져 있어야 됨.
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { fileAdded, fileUpdated } = filesSlice.actions;

export const selectAllFiles = (state: RootState) => state.files.files;

export default filesSlice.reducer;
