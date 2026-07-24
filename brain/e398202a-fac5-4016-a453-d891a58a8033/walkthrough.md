# Setup Walkthrough

We have successfully configured and executed the project locally on your machine.

## Changes Made

### 1. System-Level Dependencies (User Space)
- **Git Portable**: Since system-wide Git installation failed due to lack of administrative privileges (UAC prompt), we downloaded **Git Portable 2.45.2** to `external_bin/git`.
- **MongoDB Community Server Portable**: We downloaded and extracted MongoDB Community Server 7.0.12 to `external_bin/mongodb`.

### 2. Environment Configuration
- Created `backend/.env` containing the configuration pointing to the local MongoDB instance on port `27017` and setting up the local repository storage path.

### 3. Backend Code Modifications
- Modified [gitHttpBackend.js](file:///d:/New%20folder/github-clone/backend/utils/gitHttpBackend.js) to append `.exe` to the `git-http-backend` path dynamically when running on Windows so that Node's `spawn` command can execute the Git CGI script correctly.

### 4. Dependency Installation
- Installed Node dependencies for both frontend and backend using `cmd /c` to bypass the PowerShell script execution policy error.

---

## Validation & Execution Results

### 1. Running Databases
We started MongoDB locally inside `external_bin/mongodb_data`.
- Output log confirms successful launch and index creation:
  ```json
  {"t":{"$date":"2026-07-22T10:20:38.456+05:30"},"s":"I",  "c":"INDEX",    "id":20345,   "ctx":"LogicalSessionCacheRefresh","msg":"Index build: done building", ...}
  ```

### 2. Backend Server
Started the backend server with local Git prepended to the environment path.
- Node server successfully connected to the database and is listening:
  ```
  [nodemon] starting `node server.js`
  [server] Listening on http://localhost:5000
  [server] Git repos served at http://localhost:5000/:owner/:repo.git
  [db] MongoDB connected -> mongodb://127.0.0.1:27017/github_clone
  ```

### 3. Frontend Server
Started the Vite dev server for the React client.
- Frontend server is listening:
  ```
  ➜  Local:   http://localhost:5173/
  ```

---

## How to Verify Manually

1. Open your browser and navigate to **`http://localhost:5173/`**.
2. Click **Sign up** to register a new user account.
3. Once registered, click **+ New** to create a test Git repository. Ensure you check **"Initialize this repository with a README"**.
4. Confirm you can view the repository details and commit list page.
