import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { http } from 'apps/client/src/http/api';

export const getPublicProfile = createAsyncThunk(
  'publicProfile/getUser',
  async (id: number, { rejectWithValue }) => {
    try {
      return await http.user.getPublicUser(id);
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);
