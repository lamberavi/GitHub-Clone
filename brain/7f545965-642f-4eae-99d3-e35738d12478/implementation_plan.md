# Implementation Plan: Sidebar Drawer and Functional Links

This plan details the addition of a GitHub-like slide-out sidebar drawer triggered by the navigation menu hamburger button, matching the design in the user's screenshot. All links on the drawer will be made fully functional.

## User Review Required
> [!IMPORTANT]
> The sidebar drawer will be rendered globally. We will support navigating to a new "Global Issues" and "Global Pull Requests" screen when the corresponding sidebar buttons are clicked.

## Open Questions
No open questions at this stage. The requirements are clear from the provided screenshot.

## Proposed Changes

### Component: Sidebar and Navigation Drawer
We will update `components/Sidebar.js` to include the sidebar drawer layout, list of repositories, navigation links, and searching functionality.

#### [MODIFY] [Sidebar.js](file:///c:/Users/ravil/.gemini/antigravity-ide/scratch/github-clone/components/Sidebar.js)
- Add `renderSidebarDrawer(state, actions)` function containing:
  - Slide-out drawer wrapper.
  - Header: Github Logo and Close Button `x`.
  - Links: Home, All issues, All pull requests, All repositories, Projects, Discussions, Codespaces, Copilot, Explore, Marketplace, MCP registry.
  - Repository Section: "Top repositories" header, Search toggle button, list of repositories matching owner and avatar styling, and "Show more" expansion button.
- Add `attachSidebarDrawerListeners(state, actions)` function:
  - Close button and backdrop overlay click triggers.
  - Search input filtering repository names.
  - Show more toggle to display all repositories or limit to the first 5.
  - Hooking navigation to all links.

### Component: Core App Layout & Routing
We will update `app.js` to manage the drawer visibility state, include action bindings, and render the global drawer.

#### [MODIFY] [app.js](file:///c:/Users/ravil/.gemini/antigravity-ide/scratch/github-clone/app.js)
- Bind the action:
  - `toggleSidebarDrawer(isOpen)` to open/close the drawer.
- Update `render()`:
  - Import and append the sidebar drawer HTML to the main layout.
  - Call `attachSidebarDrawerListeners` to register all click handlers.
- Support new `activeView` states: `'issues'` and `'pulls'`.
- Implement `renderGlobalIssues` and `renderGlobalPulls` views for listing all issues/pull requests across all repositories.

### Styling: CSS Animations and Drawer Overlays
We will update `styles.css` to add styling for the sliding sidebar drawer, transitions, and the backdrop filter.

#### [MODIFY] [styles.css](file:///c:/Users/ravil/.gemini/antigravity-ide/scratch/github-clone/styles.css)
- Add classes for `.sidebar-drawer-backdrop`, `.sidebar-drawer`, `.sidebar-drawer-header`, `.sidebar-drawer-nav`, `.sidebar-drawer-nav-item`, and repository sub-lists.
- Provide smooth CSS slide-in transitions on `.open` class.
- Support responsive viewport adjustments.

## Verification Plan

### Automated Tests
- Run PowerShell compiler `.\build.ps1` to bundle CSS, Javascript, and HTML into the unified production build.

### Manual Verification
- Deploy and open `dist/index.html` in a web browser.
- Verify clicking the hamburger button opens the sidebar drawer.
- Verify clicking close (`x`) or clicking the backdrop closes the drawer.
- Verify clicking Home navigates back to the Dashboard.
- Verify clicking All issues or All pull requests lists the corresponding items globally.
- Verify repository search inside the drawer filters repositories instantly.
- Verify repository items navigate directly to the correct repository.
- Verify design matches the user's screenshot.
