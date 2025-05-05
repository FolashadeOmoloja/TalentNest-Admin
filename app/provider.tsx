"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store"; // Path to your store

// Define the type for the children prop
interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
