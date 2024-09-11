import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	searchTerm: "",
	page: 1,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
});

export const { setSearchTerm, setCurrentPage } = profileSlice.actions;
export default profileSlice.reducer;