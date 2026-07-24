# Implementation Plan - GitHub Clone (Vanilla JS + CSS)

A premium, highly interactive client-side GitHub clone designed to showcase repositories, code exploration, issue tracking, pull requests, commit history, and a dynamic contribution graph.

Since Node.js/npm is not present on the host environment, we will build this as a modern **Vanilla JavaScript (ES6 Modules) Single Page Application** with zero dependencies. It will run instantly and natively in any browser.

## User Review Required

> [!IMPORTANT]
> - **Workspace Configuration**: We will place this project inside `C:\Users\ravil\.gemini\antigravity-ide\scratch\github-clone`. Once initialized, you should open this folder as your active workspace in your IDE.
> - **Technology Stack**: We are using **Vanilla HTML5, modern CSS3 variables/glassmorphism, and ES6 JavaScript Modules**. This ensures the application works immediately without compiling or installing Node packages, while maintaining a modular structure.
> - **Mock Data Engine**: The app will implement a robust mock data engine stored in local storage, allowing you to create repositories, make commits, open issues, and write code directly in the app.

---

## Proposed Project Structure

We will place the project in `C:\Users\ravil\.gemini\antigravity-ide\scratch\github-clone`.

```
github-clone/
├── index.html          <-- Main entry point, loads app.js
├── styles.css          <-- Core design system (colors, typography, glassmorphism, layouts)
├── app.js              <-- Central State Management (Localstorage) & App Router
└── components/
    ├── Navigation.js   <-- Top navigation bar with search, notification indicators
    ├── Sidebar.js      <-- Profile info & repo quick-switcher
    ├── ContributionGraph.js <-- Dynamic contribution calendar (interactive)
    ├── RepoList.js     <-- Main list of repositories with filtering/sorting
    ├── RepoHeader.js   <-- Repository detail tabs (Code, Issues, Pull Requests, Settings)
    ├── FileExplorer.js <-- File tree navigation + styled code viewer
    ├── CommitList.js   <-- Timeline of commits with code changes counts
    ├── IssueTracker.js <-- Interactive issue list, comment threads, new issue forms
    ├── PullRequestTracker.js <-- Pull request browser with mock merge operations
    └── RepoSettings.js <-- Settings panel with options to delete or rename repository
```

---

## Proposed Phases of Development

### Phase 1: Shell & Core Styling
- Create `index.html` and define structure.
- Define `styles.css` with a premium dark theme (deep space grays `#0d1117`, blue/teal accents `#58a6ff`, `#3fb950`, custom scrollbars, animations).
- Import Lucide icons dynamically via CDN so we have rich vector iconography.

### Phase 2: State Manager & Mock Data (`app.js` & `data/mockData.js`)
- Write a modular state container that manages:
  - User details (avatar, bio, followers, contributions).
  - Repositories (folders/files, commits history, issues with comments, pull requests).
  - Current view state (active page, active repository, active tab, active file).
- Hook state changes to automatically re-render the app.

### Phase 3: Dashboard Views (Repositories, Profile, Contributions)
- Build the profile column, search interface, and repository list.
- Build the **Contribution Graph**: a dynamically populated grid showing daily activity over the past year. Hovering over a square displays the date and number of contributions.

### Phase 4: Repository Detail View (File Tree & Code Reader)
- Implement a split-pane view for repositories.
- **Left Pane**: Collapsible file tree showing folders and files.
- **Right Pane**: File editor/viewer. Selecting a file renders its content in a styled container.

### Phase 5: Issues, Pull Requests & Settings
- **Issues**: Create lists, detailed comment threads (add comments!), and new issue creator.
- **PRs**: Show pull requests and add a "Merge Pull Request" button that updates state and commits changes.
- **Settings**: Rename repository or delete it.

---

## Verification Plan

### Automated Verification
- We will double-check all JavaScript files for syntax errors and import paths.

### Manual Verification
- We will start a basic HTTP server or direct file path viewing instructions to test the app in the browser.
- We will verify that interactive actions (creating a repo, committing code, adding comments, merging PRs) correctly save state in LocalStorage.
