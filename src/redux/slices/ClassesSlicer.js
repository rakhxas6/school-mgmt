import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabaseClient";

/* ================= FETCH CLASSES ================= */
export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("created_at", { ascending: false }); // Optional: order by date
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch classes");
    }
  }
);

/* ================= ADD CLASS ================= */
export const addClass = createAsyncThunk(
  "classes/addClass",
  async (classData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .insert([classData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to add class");
    }
  }
);

/* ================= UPDATE CLASS ================= */
export const updateClass = createAsyncThunk(
  "classes/updateClass",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to update class");
    }
  }
);

/* ================= DELETE CLASS ================= */
export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to delete class");
    }
  }
);

/* ================= CLASSES SLICE ================= */
const ClassesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch classes
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add class
    builder
      .addCase(addClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.unshift(action.payload); // Add to beginning
      })
      .addCase(addClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update class
    builder
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.classes.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete class
    builder
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = state.classes.filter(c => c.id !== action.payload);
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ClassesSlice.actions;
export default ClassesSlice.reducer;