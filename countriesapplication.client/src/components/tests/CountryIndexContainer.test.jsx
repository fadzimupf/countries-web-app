import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CountryIndexContainer from "../CountryIndexContainer";
import * as countryApi from "../../api/countryApi";

vi.mock("../../api/countryApi");

vi.mock("../LoadingComponent", () => ({
  default: ({ text }) => <div data-testid="loading">Loading {text}...</div>,
}));

vi.mock("../CountryGrid", () => ({
  default: ({ countries }) => (
    <div data-testid="country-grid">
      {countries.map((c) => (
        <span key={c.name}>{c.name}</span>
      ))}
    </div>
  ),
}));

const mockCountries = [
  { name: "South Africa", flag: "https://flagcdn.com/za.svg" },
  { name: "Germany", flag: "https://flagcdn.com/de.svg" },
];

describe("CountryIndexContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading component while fetching", () => {
    countryApi.getCountries.mockReturnValue(new Promise(() => {}));
    render(<CountryIndexContainer />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByText("Loading countries...")).toBeInTheDocument();
  });

  it("renders the page header", () => {
    countryApi.getCountries.mockReturnValue(new Promise(() => {}));
    render(<CountryIndexContainer />);
    expect(screen.getByText("🌍 Know Your Flags")).toBeInTheDocument();
    expect(
      screen.getByText("Click on a flag to explore country details"),
    ).toBeInTheDocument();
  });

  it("renders CountryGrid with countries after successful fetch", async () => {
    countryApi.getCountries.mockResolvedValue({ data: mockCountries });
    render(<CountryIndexContainer />);

    await waitFor(() => {
      expect(screen.getByTestId("country-grid")).toBeInTheDocument();
    });

    expect(screen.getByText("South Africa")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
  });

  it("hides loading after fetch completes", async () => {
    countryApi.getCountries.mockResolvedValue({ data: mockCountries });
    render(<CountryIndexContainer />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    countryApi.getCountries.mockRejectedValue(new Error("API down"));
    render(<CountryIndexContainer />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load countries")).toBeInTheDocument();
    });

    expect(screen.getByText("Failed to load countries.")).toBeInTheDocument();
  });

  it("does not render CountryGrid when there is an error", async () => {
    countryApi.getCountries.mockRejectedValue(new Error("API down"));
    render(<CountryIndexContainer />);

    await waitFor(() => {
      expect(screen.queryByTestId("country-grid")).not.toBeInTheDocument();
    });
  });

  it("does not render error message on successful fetch", async () => {
    countryApi.getCountries.mockResolvedValue({ data: mockCountries });
    render(<CountryIndexContainer />);

    await waitFor(() => screen.getByTestId("country-grid"));
    expect(
      screen.queryByText("Failed to load countries"),
    ).not.toBeInTheDocument();
  });

  it("calls getCountries on mount", async () => {
    countryApi.getCountries.mockResolvedValue({ data: [] });
    render(<CountryIndexContainer />);

    await waitFor(() => {
      expect(countryApi.getCountries).toHaveBeenCalledTimes(1);
    });
  });
});
