import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

import { getUsers } from "@/app/api/queries";
import { GitHubResponseItem } from "@/app/api/types";

import { ResultsList } from "../resultsList";
import { SearchInput } from "../searchInput";

type UserItemProps = {
  item: GitHubResponseItem;
};

const MAX_GITHUB_USERNAME_LENGTH = 39;

const validationSchema = yup
  .string()
  .max(MAX_GITHUB_USERNAME_LENGTH, "Username too long")
  .trim();

const UserItem = ({ item }: UserItemProps) => {
  return (
    <Link href={item.html_url} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", width: "100%", marginBottom: "8px" }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
            cursor: "pointer",
            width: "100%",
            height: 60,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          <Avatar
            src={item.avatar_url}
            alt={item.login}
            sx={{ width: 48, height: 48 }}
          />
          <CardContent sx={{ height: 60 }}>
            <Typography variant="h6">{item.login}</Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export const UserSearch = () => {
  const [username, setUsername] = useState("");

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
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
        nextPage: users.items.length === 30 ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
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
          isLoading={isLoading}
          totalCount={totalCount}
        />
      )}
    </Box>
  );
};
