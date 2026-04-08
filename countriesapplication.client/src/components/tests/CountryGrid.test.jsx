import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CountryGrid from "../CountryGrid";

vi.mock("../FlagCard", () => ({
  default: ({ country, onOpen }) => (
    <div data-testid={`flag-card-${country.name}`} onClick={onOpen}>
      {country.name}
    </div>
  ),
}));

vi.mock("../FlagCardDetails", () => ({
  default: ({ country, onClose }) => (
    <div data-testid={`flag-details-${country.name}`} onClick={onClose}>
      Details: {country.name}
    </div>
  ),
}));

const mockCountries = [
  { name: "South Africa", flag: "https://flagcdn.com/za.svg" },
  { name: "Germany", flag: "https://flagcdn.com/de.svg" },
  { name: "Japan", flag: "https://flagcdn.com/jp.svg" },
];

describe("CountryGrid", () => {
  it("renders a FlagCard for each country", () => {
    render(<CountryGrid countries={mockCountries} />);
    mockCountries.forEach((c) => {
      expect(screen.getByTestId(`flag-card-${c.name}`)).toBeInTheDocument();
    });
  });

  it("renders nothing when countries array is empty", () => {
    const { container } = render(<CountryGrid countries={[]} />);
    expect(
      container.querySelectorAll('[data-testid^="flag-card-"]'),
    ).toHaveLength(0);
  });

  it("shows FlagCardDetails when a country is clicked", () => {
    render(<CountryGrid countries={mockCountries} />);
    fireEvent.click(screen.getByTestId("flag-card-South Africa"));
    expect(screen.getByTestId("flag-details-South Africa")).toBeInTheDocument();
  });

  it("hides FlagCardDetails and shows FlagCard when details is closed", () => {
    render(<CountryGrid countries={mockCountries} />);

    fireEvent.click(screen.getByTestId("flag-card-South Africa"));
    expect(screen.getByTestId("flag-details-South Africa")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("flag-details-South Africa"));
    expect(screen.getByTestId("flag-card-South Africa")).toBeInTheDocument();
    expect(
      screen.queryByTestId("flag-details-South Africa"),
    ).not.toBeInTheDocument();
  });

  it("only shows details for the clicked country, not others", () => {
    render(<CountryGrid countries={mockCountries} />);
    fireEvent.click(screen.getByTestId("flag-card-Germany"));

    expect(screen.getByTestId("flag-details-Germany")).toBeInTheDocument();
    expect(screen.getByTestId("flag-card-South Africa")).toBeInTheDocument();
    expect(screen.getByTestId("flag-card-Japan")).toBeInTheDocument();
  });

  it("switching active country updates the view correctly", () => {
    render(<CountryGrid countries={mockCountries} />);

    fireEvent.click(screen.getByTestId("flag-card-South Africa"));
    expect(screen.getByTestId("flag-details-South Africa")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("flag-details-South Africa")); // close
    fireEvent.click(screen.getByTestId("flag-card-Germany")); // open another
    expect(screen.getByTestId("flag-details-Germany")).toBeInTheDocument();
    expect(
      screen.queryByTestId("flag-details-South Africa"),
    ).not.toBeInTheDocument();
  });
});
