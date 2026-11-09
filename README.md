# Web Programming - Fall 2026 - Assignment 7

## File Organization

/assignment7
├─ src/
│   ├─ api/
│   │   ├─ productsApi.js
│   │   └─ authApi.js
│   ├─ hooks/
│   │   ├─ useFetch.js
│   │   └─ useLocalStorage.js
│   ├─ context/
│   │   └─ AuthContext.jsx
│   ├─ store/
│   │   └─ cartStore.js
│   ├─ components/
│   │   ├─ Layout.jsx
│   │   ├─ NavBar.jsx
│   │   ├─ ProductCard.jsx
│   │   └─ ProtectedRoute.jsx
│   ├─ pages/
│   │   ├─ Home.jsx
│   │   ├─ ProductList.jsx
│   │   ├─ ProductDetail.jsx
│   │   ├─ Cart.jsx
│   │   ├─ Login.jsx
│   │   └─ NotFound.jsx
│   ├─ App.jsx
│   └─ main.jsx
├─ index.html
└─ package.json



---

## Section 10 - Reasoning Questions

### 1. State choices
- **Signed-in user:** Placed in `AuthContext` using `useReducer`. User authentication state doesn't change constantly, but it needs to be accessible across layout and route protection logic.
- **Cart:** Managed with a `Zustand` store. Cart data updates frequently as users add or adjust items, and this state needs to be accessed by distant components like `NavBar`, `ProductDetail`, and `Cart`.
- **Filter values:** Kept directly in the **URL query string** with `useSearchParams`. This keeps the URL as the single source of truth and allows filtered catalogue pages to be shared or reloaded.
- **Product list:** Handled asynchronously inside `ProductList` using the custom `useFetch` hook, managed locally via `useReducer`.
- **Theme preference:** Stored using the custom `useLocalStorage` hook so the chosen theme remains saved across browser refreshes.

### 2. Context versus store
I kept the signed-in user inside React Context because authentication checks happen infrequently and naturally fit into top-level route management. On the other hand, the cart is handled via Zustand because cart updates happen frequently. Putting fast-changing cart state in Context would force unnecessary re-renders across all provider children every time a user changes item quantities. Swapping the two would slow down rendering performance for cart interactions.

### 3. Custom hooks
The `useFetch` hook encapsulates the asynchronous fetch logic, `useReducer` state progression, and request cancellation with `AbortController`. It shares this operational logic between `ProductList` and `ProductDetail`, but it intentionally does not share actual state data. Calling `useFetch` in different components creates completely independent state instances.

### 4. Route parameters
The `id` retrieved from `useParams()` is a `string`. This was important when passing it to API helper functions like `fetchProduct(id)` and setting it as a dependency in `useFetch` to correctly trigger network re-requests when switching product URLs.

### 5. Protected routes
The `ProtectedRoute` wrapper is a client-side UX feature designed to redirect unauthenticated users back to `/login`. It isn't true security on its own, because client-side JavaScript can always be inspected or modified. Proper security requires server-side validation using tokens or session cookies on actual API endpoints.

### 6. Deep links
If this application were deployed on a standard static file server, navigating directly to `/products/3` or refreshing that page would trigger a server 404 error because no physical file exists at that path. It works fine during development because the Vite dev server rewrites all incoming routes back to `index.html`, allowing React Router to take over routing on the browser side.

---

## Self-Study Notes & Implementation Challenges

- **Preserving Search Params:** When updating one filter (like category), I used the updater callback inside `setSearchParams` (`prev => { prev.set('q', val); return prev; }`) so active query parameters like the search text aren't accidentally wiped out.
- **Safe Store Initialization:** To prevent crashes if invalid JSON is stored in local storage, I wrapped `localStorage.getItem` parsing in a `try/catch` block inside the initial Zustand state setup.
- **Handling Abort Signals:** Cleanly cancelling pending fetch requests with `AbortController` required checking `err.name !== 'AbortError'` in `useFetch` so component unmounts wouldn't dispatch unnecessary error states.
