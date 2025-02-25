import { GitHubAPIError } from "./errors";
import { GitHubResponse, UserSearchQueryParams } from "./types";

const BASE_URL = "https://api.github.com/search";
const DEFAULT_ITEMS_PER_PAGE = 30;

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
  perPage = DEFAULT_ITEMS_PER_PAGE,
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

      return {
        incomplete_resuts: false,
        total_count: 0,
        items: [],
      };
    }
  };

const fetchUsers = fetchFromGitHub(`${BASE_URL}/users`);

export const getUsers = async (
  searchQuery: UserSearchQueryParams,
): Promise<GitHubResponse> => fetchUsers(createSearchQuery(searchQuery));
