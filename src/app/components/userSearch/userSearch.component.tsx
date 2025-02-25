import { Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as yup from "yup";

import { DEFAULT_ITEMS_PER_PAGE, getUsers } from "@/app/api/queries";

import { ResultsList } from "../resultsList";
import { SearchInput } from "../searchInput";

import { UserItem } from "./userItem.component";

const MAX_GITHUB_USERNAME_LENGTH = 39;

const validationSchema = yup
  .string()
  .max(MAX_GITHUB_USERNAME_LENGTH, "Username too long")
  .trim();

export const UserSearch = () => {
  const [username, setUsername] = useState("");

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["users", username],
      queryFn: async ({ pageParam = 1 }) => {
        const users = await getUsers({
          username,
          page: pageParam,
        });

        return {
          items: users.items,
          totalCount: users.total_count,
          nextPage:
            users.items.length === DEFAULT_ITEMS_PER_PAGE
              ? pageParam + 1
              : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!username,
    });

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0].totalCount;

  return (
    <Box sx={{ width: "100%" }}>
      <SearchInput
        label="User Search"
        placeholder="Type to search for a user..."
        validationSchema={validationSchema}
        onUpdate={setUsername}
      />
      {username && (
        <ResultsList
          items={items}
          renderItem={(item) => <UserItem item={item} />}
          itemHeight={68}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          totalCount={totalCount}
          isLoading={isLoading}
          hasError={!!error}
        />
      )}
    </Box>
  );
};
