# React Country Search & Auth App

## Overview
Short project summary: Auth with protected routes, college form using useReducer, country search with debounce, toggle between pagination/infinite scroll, dark/light theme.

## Run Locally
1. Clone repo
2. `npm install`
3. `npm run dev` (or `npm start` for CRA)
4. Open http://localhost:3000

## Features
- Signup/Login with useReducer-based auth and localStorage persistence
- Private routes
- College form state managed by useReducer with validation
- Country search using https://api.first.org/data/v1/countries with debounce & suggestions
- Toggle between pagination and infinite scroll
- Light/Dark themes (persisted)

## Notes & Learnings
- Why useReducer is useful for nested form state
- Debounce to reduce API calls
- Tradeoffs: client-side filtering vs server-side filtering

## Submission
- Repo link: `https://github.com/<username>/<repo>`
- Instructions to run (above)
