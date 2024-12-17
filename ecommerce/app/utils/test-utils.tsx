import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";

export const renderWithProvider = (ui: ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};
