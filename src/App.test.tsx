import { describe, expect } from "vitest";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./App";

describe("<App />", () => {
  it("renders static data", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(getByText("All my cleanings")).toBeInTheDocument();
  });
});
