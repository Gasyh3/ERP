'use client';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../axios';

// Définition du type de l'état d'authentification
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

// État initial typé
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

// Définition du type des credentials pour `authUser`
interface AuthCredentials {
    username: string;
    password: string;
}

// Définition du type de la réponse utilisateur
interface UserResponse {
    isAuthentificated: boolean;
    userID: number;
    lastname: string;
    firstname: string;
    mail: string;
    attached_to: number;
    pilote: boolean;
    id: number;
    role: string;
    administrateur: boolean;
    entreprise: string;
    telephone: string;
    username: string;
}

// Async Thunk pour l'authentification avec typage des entrées et sorties
export const authUser = createAsyncThunk<UserResponse, AuthCredentials>(
    'auth/authUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', { username, password }); // Utilisation de l'instance
            return response.data.user as UserResponse;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erreur lors de l'authentification");
        }
    }
);

// Création du Slice Redux
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            return { ...initialState, isAuthentificated: false }; // Réinitialise l'état avec un logout propre
        }
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
                Object.assign(state, action.payload);
            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Erreur d'authentification";
            });
    }
});

// Export des actions et du reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
