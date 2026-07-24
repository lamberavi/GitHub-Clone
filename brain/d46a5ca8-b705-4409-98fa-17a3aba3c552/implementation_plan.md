# User Profile Page Layout and Popular Pinned Repositories

This plan details how to build the exact **User Profile Page** shown in your screenshots (`github.com/lamberavi`), featuring your actual photo avatar, pinned repositories grid, contributions heatmaps, and year history selectors.

---

## User Review Required

> [!IMPORTANT]
> **Layout & Nav Additions**
> 1. **Routing to Profile**: Click on your profile photo avatar in the top-right navbar menu to open the User Profile Page.
> 2. **Profile tabs bar**: Overview, Repositories, Projects, Packages, Stars.
> 3. **Left Column**:
>    *   **User Avatar**: Renders your exact profile photo loaded dynamically via the GitHub public redirect (`https://github.com/lamberavi.png`).
>    *   **Metadata**: Username (`lamberavi`), Full Name (`Ravi Lamber`), and full-width "Edit profile" button.
> 4. **Right Column (Overview contents)**:
>    *   **Popular repositories**: A grid displaying 6 pinned repository cards: `RAVI6361`, `React-portfolio-website`, `Online-Courses`, `E-Commerce`, `MusicWebsite`, and `Practice`.
>    *   **Contribution Heatmap**: Heatmap displaying commit blocks, Less/More intensity filters, contribution counts, and year filters (`2026`, `2025`, `2024`, `2023`).
>    *   **Contribution activity logs**: Showing a timeline checklist for July 2026.
> 5. **Interactive Pinned Items**: Clicking any repository in the profile cards will take you directly into that repository's detail view (Code grid, Issues, PRs).

---

## Proposed Changes

### 1. Update [app.js](file:///c:/Users/ravil/.gemini/antigravity-ide/scratch/github-clone/app.js)
*   **State & Routing**:
    *   Add `activeView` to track whether the dashboard (`dashboard`) or user profile (`profile`) is currently displayed.
    *   Implement actions: `navigateToProfile` and `navigateToDashboard`.
*   **Render Coordination**:
    *   If `activeRepoId === null` and `activeView === 'profile'`: Render the Profile Page full-width (hiding the dashboard repositories sidebar).
    *   Bind logo clicks to return to the dashboard.

### 2. Update [Navigation.js](file:///c:/Users/ravil/.gemini/antigravity-ide/scratch/github-clone/components/Navigation.js)
*   Bind click events on the navbar profile icon (`#nav-profile-btn`) to trigger the `navigateToProfile` action.

### 3. Create Profile Component
*   Create a new file `components/Profile.js` to render the user profile layout: profile tabs, left-column user picture, popular pinned repositories cards grid, contributions graph calendar, and activity logs.

---

## Verification Plan

### Manual Verification
1. Open the application.
2. Click on your profile picture in the top-right corner. Confirm the user profile page loads.
3. Confirm the layout looks exactly like your screenshots: circular profile avatar, edit profile button, pinned repositories, and contributions calendar.
4. Click on `React-portfolio-website` in the pinned grid. Verify it successfully navigates into the code explorer of that repository.
5. Click the GitHub logo in the top navbar and verify it returns to the dashboard view.
