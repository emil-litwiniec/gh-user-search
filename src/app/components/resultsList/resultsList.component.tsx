import {
  Box,
  Card,
  CircularProgress,
  List,
  ListItem,
  styled,
  Typography,
} from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { ReactNode, useEffect, useRef } from "react";

const CardWrapper = styled(Card)`
  min-height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ResultsListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  hasError?: boolean;
  itemHeight?: number;
  totalCount?: number;
};

export const ResultsList = <T,>({
  items,
  itemHeight = 60,
  renderItem,
  fetchNextPage,
  hasNextPage,
  isLoading = false,
  totalCount,
  hasError,
}: ResultsListProps<T>) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: parentRef.current, rootMargin: "100px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (items.length == 0) {
    return (
      <CardWrapper variant="outlined">
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Typography>No results</Typography>
        )}
      </CardWrapper>
    );
  }

  if (hasError) {
    return (
      <CardWrapper variant="outlined">
        <Typography>Couldn&apos;t fetch the results</Typography>
      </CardWrapper>
    );
  }

  return (
    <Box>
      <CardWrapper variant="outlined">
        <Box
          ref={parentRef}
          sx={{
            height: 500,
            width: "100%",
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-struecrollbar": { display: "none" },
          }}
        >
          <List
            sx={{
              position: "relative",
              marginBlock: 2,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = items[virtualRow.index];
              return (
                <ListItem
                  key={virtualRow.key}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`,
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                  }}
                >
                  {renderItem(item)}
                </ListItem>
              );
            })}
          </List>

          {hasNextPage && (
            <Box
              ref={loadMoreRef}
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
                mb: 2,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </CardWrapper>
      {totalCount && items.length && (
        <Typography
          component="span"
          variant="caption"
          sx={{
            ml: "auto",
            width: "max-content",
            display: "block",
            mt: 1,
          }}
        >
          {items.length} / {totalCount}
        </Typography>
      )}
    </Box>
  );
};
