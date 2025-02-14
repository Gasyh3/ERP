"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../axios";

// ✅ Définition du type de l'état d'authentification
interface AuthState {
  isAuthentificated: boolean | null;
  id: number | null;
  userID: number | null;
  firstname: string | null;
  lastname: string | null;
  mail: string | null;
  telephone: string | null;
  username: string | null;
  pilote: boolean;
  role: string | null;
  attached_to: number;
  administrateur: boolean;
  entreprise: string | null;
  error: string | null;
  loading: boolean;
}

const storedAuth = typeof window !== "undefined" ? localStorage.getItem("authState") : null;
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

// ✅ État initial structuré
const initialState: AuthState = {
  isAuthentificated: null,
  id: null,
  userID: null,
  firstname: null,
  lastname: null,
  mail: null,
  telephone: null,
  username: null,
  pilote: false,
  role: null,
  attached_to: -1,
  administrateur: false,
  entreprise: null,
  error: null,
  loading: true,
};

// ✅ Définition du type des credentials pour `authUser`
interface AuthCredentials {
  username: string;
  password: string;
}

// ✅ Définition du type de la réponse utilisateur (API)
interface UserResponse {
  isAuthentificated: boolean;
  ID: number;
  UserID: number;
  FirstName: string;
  LastName: string;
  mail: string;
  telephone: string;
  username: string;
  Pilote: boolean;
  Role: string;
  AttachedTo: number;
  Administrateur: boolean;
  Entreprise: string;
}

// ✅ Thunk asynchrone pour l'authentification utilisateur
export const authUser = createAsyncThunk<UserResponse, AuthCredentials>(
  "auth/authUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { username, password });

      console.log("🔍 Réponse API après login :", response.data.user); // DEBUG API

      return response.data.user as UserResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erreur lors de l'authentification");
    }
  }
);

// ✅ Création du Slice Redux
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      return { ...initialState, isAuthentificated: false }; // Réinitialise l'état avec un logout propre
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.loading = false;
        state.isAuthentificated = true;

        console.log("📦 Mise à jour de Redux avec :", action.payload); // DEBUG REDUX

        // ✅ Assurer que les données sont bien stockées avec les bons noms
        state.firstname = action.payload.FirstName ?? null;
        state.lastname = action.payload.LastName ?? null;
        state.mail = action.payload.mail ?? null;
        state.id = action.payload.ID ?? null;
        state.userID = action.payload.UserID ?? null;
        state.role = action.payload.Role ?? null;
        state.pilote = action.payload.Pilote ?? false;
        state.administrateur = action.payload.Administrateur ?? false;
        state.attached_to = action.payload.AttachedTo ?? -1;
        state.entreprise = action.payload.Entreprise ?? null;
        state.telephone = action.payload.telephone ?? null;
        state.username = action.payload.username ?? null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Erreur d'authentification";
      });
  },
});

// ✅ Export des actions et du reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
