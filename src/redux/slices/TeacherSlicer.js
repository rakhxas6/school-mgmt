import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabaseClient";

/* ================= FETCH TEACHERS ================= */
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .order("created_at", { ascending: false }); 

      if (error) throw error;
      return data || [];
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch teachers");
    }
  }
);

/* ================= CLASSES SLICE ================= */
const TeachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch teachers
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = TeachersSlice.actions;
export default TeachersSlice.reducer;