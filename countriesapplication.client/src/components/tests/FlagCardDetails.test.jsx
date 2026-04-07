import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FlagCardDetails from "../FlagCardDetails";
import * as countryApi from "../../api/countryApi";

vi.mock("../../api/countryApi");

vi.mock("../LoadingComponent", () => ({
  default: ({ text }) => <div data-testid="loading">{`Loading ${text}...`}</div>,
}));

const mockCountry = { name: "South Africa", flag: "https://flagcdn.com/za.svg" };

const mockDetails = {
  name: "South Africa",
  population: 60000000,
  capital: "Pretoria",
};

describe("FlagCardDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    countryApi.getCountryByName.mockReturnValue(new Promise(() => {})); 
    render(<FlagCardDetails country={mockCountry} onClose={vi.fn()} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByText("Loading country...")).toBeInTheDocument();
  });

  it("renders country details after successful fetch", async () => {
    countryApi.getCountryByName.mockResolvedValue({ data: mockDetails });
    render(<FlagCardDetails country={mockCountry} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("South Africa")).toBeInTheDocument();
    });

    expect(screen.getByText(/60 000 000/)).toBeInTheDocument();
    expect(screen.getByText(/Pretoria/)).toBeInTheDocument();
  });

  it("shows error message on fetch failure", async () => {
    countryApi.getCountryByName.mockRejectedValue(new Error("Network error"));
    render(<FlagCardDetails country={mockCountry} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load country.")).toBeInTheDocument();
    });
  });

  it("calls onClose when the card is clicked", async () => {
    countryApi.getCountryByName.mockResolvedValue({ data: mockDetails });
    const onClose = vi.fn();
    render(<FlagCardDetails country={mockCountry} onClose={onClose} />);

    await waitFor(() => screen.getByText("South Africa"));
    fireEvent.click(screen.getByText("South Africa").closest(".card"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("re-fetches when country name changes", async () => {
    countryApi.getCountryByName.mockResolvedValue({ data: mockDetails });
    const { rerender } = render(
      <FlagCardDetails country={mockCountry} onClose={vi.fn()} />
    );
    await waitFor(() => screen.getByText("South Africa"));

    const newCountry = { name: "Germany" };
    const newDetails = { name: "Germany", population: 83000000, capital: "Berlin" };
    countryApi.getCountryByName.mockResolvedValue({ data: newDetails });

    rerender(<FlagCardDetails country={newCountry} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Germany")).toBeInTheDocument();
    });
    expect(countryApi.getCountryByName).toHaveBeenCalledTimes(2);
  });

  it("calls getCountryByName with the correct country name", async () => {
    countryApi.getCountryByName.mockResolvedValue({ data: mockDetails });
    render(<FlagCardDetails country={mockCountry} onClose={vi.fn()} />);

    await waitFor(() => screen.getByText("South Africa"));
    expect(countryApi.getCountryByName).toHaveBeenCalledWith("South Africa");
  });
});