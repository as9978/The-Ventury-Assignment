import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAlert {
  status: "success" | "error" | "info" | "warning";
  body: string;
  variant?: "solid" | "subtle" | "left-accent" | "top-accent";
  title?: string;
  duration?: number;
  position?:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
}

interface InitialState {
  alert: IAlert | null;
}

const initialState: InitialState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlert>) => {
      state.alert = {
        ...action.payload,
        variant: action.payload.variant || "solid",
        title: action.payload.title || action.payload.variant,
        duration: action.payload.duration || 5000,
        position: action.payload.position || "top-right",
      };
    },
    removeAlert: (state) => {
      state.alert = null;
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
