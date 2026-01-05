import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabaseClient";

/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // ===== Admin Hardcoded Login =====
      if (email === "admin" && password === "admin") {
        return { user: { email: "admin" }, session: null, role: "admin" };
      }

      // ===== Guest Login (optional if needed) =====
      if (email === "guest") {
        return { user: { email: "guest" }, session: null, role: "guest" };
      }

      // ===== Supabase Student Login =====
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      return { user: data.user, session: data.session, role: "student" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* ================= SIGNUP ================= */

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= CHECK SESSION ================= */

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      return {
        user: session?.user || null,
        session: session || null,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= SLICE ================= */

const initialState = {
  user: null,
  session: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null, // New role field
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.role = action.payload.role;       // ✅ Set role
        state.isAuthenticated = action.payload.role !== "guest"; // Guest can see data without auth
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.role = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.isAuthenticated = false;
        state.role = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isAuthenticated = !!action.payload.user;
        state.role = action.payload.user ? "student" : "guest"; // Default mapping
      });
  },
});


export const { clearError } = authSlice.actions;
export default authSlice.reducer;
