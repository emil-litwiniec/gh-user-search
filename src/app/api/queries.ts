import { GitHubAPIError } from "./errors";
import { GHSearchItem, GitHubResponse, UserSearchQueryParams } from "./types";

const BASE_URL = "https://api.github.com/search";

const handleFetchResponse = async (
  response: Response,
): Promise<GitHubResponse> => {
  if (!response.ok) {
    throw new GitHubAPIError(
      `GitHub API Error: ${response.status}`,
      response.status,
    );
  }
  return response.json();
};

const createSearchQuery = ({
  username,
  perPage = 30,
  page = 1,
}: UserSearchQueryParams) => {
  const params = new URLSearchParams({
    q: username,
    per_page: perPage.toString(),
    page: page.toString(),
  });

  return `?${params}`;
};

const fetchFromGitHub =
  (endpoint: string) =>
  async (query: string): Promise<GitHubResponse> => {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (!token) {
      throw new Error(
        "GitHub token is missing. Please check your environment variables.",
      );
    }

    try {
      const response = await fetch(`${endpoint}${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleFetchResponse(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return { items: [] };
    }
  };

const fetchUsers = fetchFromGitHub(`${BASE_URL}/users`);

const extractItems = (data: GitHubResponse): GHSearchItem[] => data.items;

export const getUsers = async (
  searchQuery: UserSearchQueryParams,
): Promise<GHSearchItem[]> =>
  fetchUsers(createSearchQuery(searchQuery)).then(extractItems);
