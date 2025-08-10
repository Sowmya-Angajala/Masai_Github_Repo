# React Country Search + Auth (Starter)

## What this contains
- Simple signup/login/logout (localStorage)
- Protected dashboard route
- College form managed with `useReducer`
- Country search using `https://api.first.org/data/v1/countries` with:
  - debounce
  - suggestions
  - toggle between pagination and infinite scroll
- Dark / Light theme toggle (top-right)

## How to run
1. `npm install`
2. `npm start`
3. Open `http://localhost:3000`

## Notes & Extensibility
- Auth is a demo using localStorage. Replace `contexts/AuthContext.js` functions with real API calls (or Firebase/Auth0).
- Country API dataset is small — we fetch it once then filter client-side to keep debounce and search fast.
- `useReducer` example is in `src/reducers/collegeFormReducer.js`.
- To change debounce delay, edit `src/hooks/useDebounce.js`.
- To support server-side pagination, change `CountrySearch` to call a paginated endpoint.

## What I learned / observations
- Debounce prevents excessive API calls and smooths the typing experience.
- `useReducer` is great for grouped form state and clear actions.
- IntersectionObserver provides a nice infinite-scroll UX without heavy libraries.
