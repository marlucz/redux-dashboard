import { render, screen } from "@testing-library/react";
import { ErrorMessage } from ".";

describe("<ErrorMessage />", () => {
  it("should render error message", () => {
    render(<ErrorMessage />);

    expect(screen.getByText("Oh no, there was an error!")).toBeInTheDocument();
    expect(screen.getByText("Please refresh the page")).toBeInTheDocument();
  });
});
