# setup_repos.ps1
# Sets up the repos directory structure with boilerplate code and repo.json files.

$baseDir = "c:\Users\ravil\.gemini\antigravity-ide\scratch\github-clone\repos"

# Ensure repos base exists
if (-not (Test-Path $baseDir)) {
    New-Item -ItemType Directory -Path $baseDir | Out-Null
}

# Repos definition list
$repos = @(
    @{
        name = "myproject"
        owner = "lamberavi"
        desc = "Personal workspace for building quantum algorithms and custom JS compilers."
        stars = 14
        forks = 2
        lang = "JavaScript"
        private = $false
        files = @{
            "README.md" = "# myproject`n`nWorkspace for coding experimental JavaScript and web components.`n`n## Run`n````bash`nnode index.js`n````"
            "index.js" = "console.log('Initializing myproject...');`nconsole.log('Gravity constant adjustment complete.');"
        }
        commits = @(
            @{ hash="a3f89e2"; message="Initialize project skeleton"; date="2026-07-15T08:00:00Z" }
        )
        issues = @()
        pullRequests = @()
    },
    @{
        name = "smart-budget-splitter"
        owner = "lamberavi"
        desc = "A premium web utility to split group expenses and analyze personal budgets using chart views."
        stars = 28
        forks = 5
        lang = "HTML"
        private = $false
        files = @{
            "README.md" = "# smart-budget-splitter`n`nSplit budgets dynamically with friends.`n`n## Usage`nOpen `index.html` in browser."
            "index.html" = "<!DOCTYPE html>`n<html>`n<head>`n  <title>Smart Budget Splitter</title>`n</head>`n<body>`n  <h1>Split expenses smoothly</h1>`n</body>`n</html>"
            "app.js" = "console.log('Budget calculations online.');"
        }
        commits = @(
            @{ hash="f2c3d4e"; message="Implement split ratio mathematical engine"; date="2026-07-14T15:20:00Z" },
            @{ hash="b1a2c3d"; message="Setup HTML page structure"; date="2026-07-12T11:00:00Z" }
        )
        issues = @(
            @{ id=1; title="Decimal calculations round down too early"; description="In split ratios like 1/3, the balance misses 1 cent. We should use precision floats."; status="open"; author="alex_finance"; createdAt="2026-07-15T12:00:00Z"; comments=@() }
        )
        pullRequests = @()
    },
    @{
        name = "Web-Based-Note-Taking"
        owner = "lamberavi"
        desc = "Local-first rich text editor supporting Markdown export, autosave, and tag organization."
        stars = 45
        forks = 9
        lang = "JavaScript"
        private = $false
        files = @{
            "README.md" = "# Web-Based Note Taking`n`nA modern editor page for your browser."
            "notes.js" = "class NoteEditor { constructor() { console.log('Editor ready.'); } }"
        }
        commits = @(
            @{ hash="c9f8a2d"; message="Integrate marked.js library for markdown parsing"; date="2026-07-10T09:30:00Z" }
        )
        issues = @()
        pullRequests = @()
    },
    @{
        name = "placementgpt"
        owner = "theankittsaini"
        desc = "Resume parser and job description matching agent built using local LLMs for automated alignment."
        stars = 182
        forks = 34
        lang = "Python"
        private = $false
        files = @{
            "README.md" = "# placementgpt`n`nParse resume PDFs and check matching index using GPT."
            "main.py" = "import sys`nprint('Parsing resume... Match index: 94.2%')"
        }
        commits = @(
            @{ hash="d4e5f6a"; message="Upgrade llama-cpp embeddings for resume matching"; date="2026-07-15T16:45:00Z" }
        )
        issues = @()
        pullRequests = @()
    },
    @{
        name = "placementgpt1"
        owner = "theankittsaini"
        desc = "Enterprise version of placementgpt with batch parsing queue and active analytics dashboard."
        stars = 98
        forks = 12
        lang = "Python"
        private = $false
        files = @{
            "README.md" = "# placementgpt1`n`nScaling placementgpt processing pipeline."
            "runner.py" = "print('Queue manager active.')"
        }
        commits = @(
            @{ hash="e7f8a9b"; message="Add Redis queue handler for parallel execution"; date="2026-07-16T04:10:00Z" }
        )
        issues = @()
        pullRequests = @()
    },
    @{
        name = "Practice"
        owner = "lamberavi"
        desc = "Daily coding problems, algorithms training, and sample CSS layouts practice folder."
        stars = 3
        forks = 0
        lang = "HTML"
        private = $false
        files = @{
            "README.md" = "# Practice`n`nCoding challenge scripts."
            "fibonacci.js" = "function fib(n) { return n <= 1 ? n : fib(n-1) + fib(n-2); }"
        }
        commits = @(
            @{ hash="7d8e9f0"; message="Add fibonacci script"; date="2026-07-01T10:00:00Z" }
        )
        issues = @()
        pullRequests = @()
    },
    @{
        name = "MusicWebsite"
        owner = "lamberavi"
        desc = "Responsive audio player page styled with dynamic visualizers and gradient overlays."
        stars = 18
        forks = 1
        lang = "CSS"
        private = $false
        files = @{
            "README.md" = "# Music Website`n`nA modern responsive music visualizer mockup."
            "style.css" = "body { background: radial-gradient(circle, #222, #000); }"
        }
        commits = @(
            @{ hash="f1e2d3c"; message="Add custom audio spectrum layout styling"; date="2026-07-11T14:00:00Z" }
        )
        issues = @()
        pullRequests = @()
    }
)

foreach ($repo in $repos) {
    $repoDir = Join-Path $baseDir $repo.name
    if (-not (Test-Path $repoDir)) {
        New-Item -ItemType Directory -Path $repoDir | Out-Null
    }

    # Write source files
    $files = $repo.files
    foreach ($key in $files.Keys) {
        $filePath = Join-Path $repoDir $key
        # Check folder exists for file (e.g. src/)
        $fileFolder = [System.IO.Path]::GetDirectoryName($filePath)
        if (-not (Test-Path $fileFolder)) {
            New-Item -ItemType Directory -Path $fileFolder | Out-Null
        }
        $files[$key] | Out-File -FilePath $filePath -Encoding utf8 -Force
    }

    # Write repo.json
    $meta = @{
        id = $repo.name
        name = $repo.name
        owner = $repo.owner
        description = $repo.desc
        stars = $repo.stars
        forks = $repo.forks
        language = $repo.lang
        isPrivate = $repo.private
        updatedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        commits = $repo.commits
        issues = $repo.issues
        pullRequests = $repo.pullRequests
    }
    
    $metaJson = $meta | ConvertTo-Json -Depth 5
    $metaJsonPath = Join-Path $repoDir "repo.json"
    $metaJson | Out-File -FilePath $metaJsonPath -Encoding utf8 -Force
}

Write-Host "Created repos successfully!" -ForegroundColor Green
