export type GHSearchResponse = {
  total_count: number;
  items: GHSearchItem[];
  incomplete_resuts: boolean;
};

export type GHSearchItem = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  score: number;
};

export type UserSearchQueryParams = {
  username: string;
  perPage?: number;
  page?: number;
};

export type GitHubResponse = {
  items: GHSearchItem[];
};
