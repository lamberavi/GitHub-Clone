# Execute HubClone Project

Setup all system-level dependencies (Git, MongoDB), install Node.js packages for both frontend and backend, configure backend environment variables, and run both servers successfully.

## User Review Required

> [!IMPORTANT]
> - **System Installation**: We will install Git and MongoDB using Windows Package Manager (`winget`). If you prefer to install these manually or already have them installed outside the default PATH, please let us know.
> - **Administrative Permissions**: Some packages installed via `winget` might trigger User Account Control (UAC) prompts on Windows. Please accept them if prompted.
> - **MongoDB Service**: MongoDB Server will be installed as a local Windows Service and start automatically.

## Open Questions

> [!NOTE]
> - Do you have an existing MongoDB Atlas / remote MongoDB database that you would prefer to use instead of installing MongoDB locally? If yes, please provide the connection URI.

## Proposed Changes

No changes to existing source code files are required to get the application running, but we will perform configuration and environment tasks.

### Environment & Configuration

#### [NEW] [.env](file:///d:/New%20folder/github-clone/backend/.env)
Copy environment variables from `backend/.env.example` to `backend/.env` for database connection, port settings, and JWT configurations.

---

### Package Installation

- Run `npm install` in [backend/package.json](file:///d:/New%20folder/github-clone/backend/package.json) using Command Prompt context to bypass PowerShell execution restriction.
- Run `npm install` in [frontend/package.json](file:///d:/New%20folder/github-clone/frontend/package.json).

## Verification Plan

### Automated/Execution Commands
- Run `winget install Git.Git -e --accept-source-agreements --accept-package-agreements` to install Git.
- Run `winget install MongoDB.Server -e --accept-source-agreements --accept-package-agreements` to install MongoDB Community Server.
- Verify Git version and MongoDB service status.
- Start backend: `cmd /c "npm run dev"` in backend folder.
- Start frontend: `cmd /c "npm run dev"` in frontend folder.

### Manual Verification
- Access the web interface at `http://localhost:5173`.
- Create a test account and verify repository creation.
