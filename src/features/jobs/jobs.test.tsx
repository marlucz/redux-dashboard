import { afterAll, afterEach, describe, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { rest } from "msw";
import { type SetupServerApi, setupServer } from "msw/node";

import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { store } from "../../store";

import { data as MOCK_DATA } from "./testMockData.ts";
import { JobsBoard } from ".";

const API_URL = "http://localhost:4000/db";

const BoardWithStore = () => (
  <Provider store={store}>
    <JobsBoard />
  </Provider>
);

describe("JobsBoard Component", () => {
  let server: SetupServerApi;

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders error component on API error", async () => {
    // @ts-expect-error some server type inconsistency
    server = setupServer(
      rest.get(API_URL, (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    server.listen();

    render(<BoardWithStore />);

    await waitFor(() => {
      expect(
        screen.getByText("Oh no, there was an error!"),
      ).toBeInTheDocument();
    });
  });

  it("renders skeleton", () => {
    // @ts-expect-error some server type inconsistency
    server = setupServer(
      rest.get(API_URL, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_DATA));
      }),
    );

    server.listen();

    render(<BoardWithStore />);

    expect(screen.getByText("All my cleanings")).toBeInTheDocument();

    expect(screen.getByText("Upcoming")).toHaveClass("bg-primary");
    expect(screen.getByText("Previous")).toHaveClass("bg-transparent");

    // without 'await waitFor' we'll see loading state
    expect(screen.queryAllByTestId("skeleton")[0]).toBeInTheDocument();
  });

  it.only("renders the component with upcoming jobs by default", async () => {
    // @ts-expect-error some server type inconsistency
    server = setupServer(
      rest.get(API_URL, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_DATA));
      }),
    );

    server.listen();

    render(<BoardWithStore />);

    // assert upcoming job data is displayed
    await waitFor(() => {
      expect(screen.queryAllByTestId("location")[0].textContent).toBe(
        "Fooweg 8",
      );
    });
  });

  it("switches between upcoming and previous jobs", async () => {
    // @ts-expect-error some server type inconsistency
    server = setupServer(
      rest.get(API_URL, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_DATA));
      }),
    );

    server.listen();

    render(<BoardWithStore />);

    await act(() => fireEvent.click(screen.getByText("Previous")));

    // assert upcoming job data is displayed
    await waitFor(() => {
      expect(screen.queryAllByTestId("location")[0].textContent).toBe(
        "Foobar 9",
      );
    });
  });
});
