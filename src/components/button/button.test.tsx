import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("<Button />", () => {
  it("should render children component", () => {
    render(
      <Button>
        <div>test</div>
      </Button>,
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it('should have "default" variant by default', () => {
    render(<Button>test</Button>);

    expect(screen.getByText("test")).toHaveClass("bg-primary");
  });

  it('should have "outline" variant when variant="outline"', () => {
    render(<Button variant="outline">test</Button>);

    expect(screen.getByText("test")).toHaveClass("bg-transparent");
  });

  it("should receive custom className", () => {
    render(<Button className="custom">test</Button>);

    expect(screen.getByText("test")).toHaveClass("custom");
  });
});
