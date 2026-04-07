import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FlagCard from "../FlagCard";

const mockCountry = {
  name: "South Africa",
  flag: "https://flagcdn.com/za.svg",
};

describe("FlagCard", () => {
  it("renders the flag image with correct src", () => {
    render(<FlagCard country={mockCountry} onOpen={vi.fn()} />);
    const img = screen.getByAltText("Flag of South Africa");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockCountry.flag);
  });

  it("renders with the correct alt text", () => {
    render(<FlagCard country={mockCountry} onOpen={vi.fn()} />);
    expect(screen.getByAltText("Flag of South Africa")).toBeInTheDocument();
  });

  it("calls onOpen when clicked", () => {
    const onOpen = vi.fn();
    render(<FlagCard country={mockCountry} onOpen={onOpen} />);
    fireEvent.click(screen.getByAltText("Flag of South Africa").closest(".card"));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("renders a Card component", () => {
    const { container } = render(<FlagCard country={mockCountry} onOpen={vi.fn()} />);
    expect(container.querySelector(".card")).toBeInTheDocument();
  });
});