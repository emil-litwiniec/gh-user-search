import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "@/tests/testUtils";

import { UserSearch } from "../userSearch.component";

describe("UserSearch", () => {
  it("updates the username state when input changes", async () => {
    renderWithProviders(<UserSearch />);

    const input = screen.getByPlaceholderText("Type to search for a user...");
    await userEvent.type(input, "testuser");

    expect(input).toHaveValue("testuser");
  });

  it("displays validation error for invalid username", async () => {
    renderWithProviders(<UserSearch />);

    const input = screen.getByPlaceholderText("Type to search for a user...");
    await userEvent.type(input, "a".repeat(40)); // 40 characters, limit is 39

    const errorMessage = await screen.findByText("Username too long");
    expect(errorMessage).toBeInTheDocument();
  });
});
