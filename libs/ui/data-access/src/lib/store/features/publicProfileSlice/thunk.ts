import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@tw/ui/data-access';
import { isAxiosError } from 'axios';

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
