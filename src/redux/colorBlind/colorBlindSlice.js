import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'cb-none',
};

const colorBlindSlice = createSlice({
    name: 'colorBlind',
    initialState,
    reducers: {
        setColorBlindMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { setColorBlindMode } = colorBlindSlice.actions;
export default colorBlindSlice.reducer;