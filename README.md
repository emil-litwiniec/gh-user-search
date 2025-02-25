## Running development server

```bash
npm run dev
```


## Notes

The app fetches GitHub users based on search input.

Response items are rendered inside virtual list for smooth performance while inifnite scrolling through results.

My main idea was to create components that are reusable and easily composable. Core files to look at are `queries.ts`, `userSearch.component.tsx`, `searchInput.component.tsx` and `resultsList.component.tsx`. 

## Live preview

[https://emil-litwiniec.github.io/gh-user-search/](https://emil-litwiniec.github.io/gh-user-search/)
