import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingComponent from "../LoadingComponent";

describe("LoadingComponent", () => {
  it("renders the loader with the provided text", () => {
    render(<LoadingComponent text="countries" />);
    expect(screen.getByText("Loading countries...")).toBeInTheDocument();
  });

  it("renders with different text values", () => {
    render(<LoadingComponent text="country" />);
    expect(screen.getByText("Loading country...")).toBeInTheDocument();
  });

  it("renders inside a segment", () => {
    const { container } = render(<LoadingComponent text="data" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
