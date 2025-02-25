import { Typography } from "@mui/material";
import { render, screen } from "@testing-library/react";
import React from "react";

import { ResultsList } from "../resultsList.component";

const mockItems = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

const mockRenderItem = (item: { id: number; name: string }) => (
  <Typography>{item.name}</Typography>
);

jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: jest.fn().mockReturnValue({
    getVirtualItems: () =>
      Array.from({ length: 20 }, (_, index) => ({
        key: index,
        index,
        size: 60,
        start: index * 60,
      })),
    getTotalSize: () => 1200,
  }),
}));

describe("ResultsList", () => {
  it("renders no results when items are empty", () => {
    render(
      <ResultsList
        items={[]}
        renderItem={mockRenderItem}
        fetchNextPage={() => {}}
        hasNextPage={false}
        isLoading={false}
      />,
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("renders the list of items", async () => {
    render(
      <ResultsList
        items={mockItems}
        renderItem={mockRenderItem}
        fetchNextPage={() => {}}
        hasNextPage={false}
        isLoading={false}
        itemHeight={60}
      />,
    );

    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(await screen.findByText("Item 20")).toBeInTheDocument();
  });
});
