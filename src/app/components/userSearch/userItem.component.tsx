import { Avatar, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

import { GitHubResponseItem } from "@/app/api/types";

type UserItemProps = {
  item: GitHubResponseItem;
};

export const UserItem = ({ item }: UserItemProps) => {
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
