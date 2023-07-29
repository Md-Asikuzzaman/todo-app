import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface initialStateType {
  loading: boolean;
  todo: TodoType[];
  error: string;
}

const initialState: initialStateType = {
  loading: false,
  todo: [],
  error: '',
};

// FETCH TODO...
export const fetchTodo = createAsyncThunk('user/fetchTodo', async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/todo');
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// ADD TODO
export const addTodo = createAsyncThunk(
  'product/addTodo',
  async (title: any) => {
    try {
      const res = await axios.post('http://localhost:3000/api/todo', {
        title,
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// DELETE TODO...
export const deleteTodo = createAsyncThunk(
  'user/deleteTodo',
  async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/todo/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// HANDLE TASK...
export const handleTodo = createAsyncThunk(
  'user/handleTodo',
  async (data: any) => {
    const { id, status } = data;

    try {
      const res = await axios.put(`http://localhost:3000/api/todo/${id}`, {
        status: status == 0 ? 1 : 0,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// UPDATE PRODUCT
export const updateTodo = createAsyncThunk(
  'product/updateTodo',
  async (data: any) => {
    const { id } = data;

    try {
      const res = await axios.put(`http://localhost:3000/api/todo/${id}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FOR FETCH TODO...
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.loading = true;
      state.todo = [];
      state.error = '';
    });

    builder.addCase(
      fetchTodo.fulfilled,
      (state, action: PayloadAction<TodoType[]>) => {
        state.loading = false;
        state.todo = action.payload;
        state.error = '';
      }
    );

    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.loading = true;
      state.todo = [];
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // FOR ADD TODO
    builder.addCase(addTodo.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      addTodo.fulfilled,
      (state, action: PayloadAction<TodoType>) => {
        state.loading = false;
        state.todo.push(action.payload);
        state.error = '';
      }
    );

    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // FOR DELETE TODO...
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      deleteTodo.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.todo = state.todo.filter(
          (existTodo) => String(existTodo.id) !== String(action.payload?.id)
        );
        state.error = '';
      }
    );

    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // FOR HANDLE TASK...
    builder.addCase(handleTodo.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      handleTodo.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.todo = state.todo.map((data) =>
          data.id === action.payload.id ? action.payload : data
        );
        state.error = '';
      }
    );

    builder.addCase(handleTodo.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // FOR UPDATE TODO.
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      updateTodo.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.todo = state.todo.map((data) =>
          data.id === action.payload.id ? action.payload : data
        );
        state.error = '';
      }
    );

    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });
  },
});

export default todoSlice.reducer;
