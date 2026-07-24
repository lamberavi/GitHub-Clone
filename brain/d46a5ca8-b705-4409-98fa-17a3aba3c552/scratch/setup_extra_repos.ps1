# setup_extra_repos.ps1
# Creates repository folders and metadata for: RAVI6361, React-portfolio-website, Online-Courses, E-Commerce.

$baseDir = "c:\Users\ravil\.gemini\antigravity-ide\scratch\github-clone\repos"

$extraRepos = @(
    @{
        name = "RAVI6361"
        owner = "lamberavi"
        desc = "Personal practice codebase for HTML exercises and responsive web page mockups."
        stars = 0
        forks = 0
        lang = "HTML"
        private = $false
        files = @{
            "README.md" = "# RAVI6361`n`nHTML training code."
            "index.html" = "<!DOCTYPE html><html><body><h1>HTML practice page</h1></body></html>"
        }
        commits = @(
            @{ hash="f3e2d1c"; message="Initial commit"; date="2026-07-01T09:00:00Z" }
        )
    },
    @{
        name = "React-portfolio-website"
        owner = "lamberavi"
        desc = "Portfolio Website built using ReactJS. Showcases visual cards, grids, and resume detail paths."
        stars = 0
        forks = 0
        lang = "JavaScript"
        private = $false
        files = @{
            "README.md" = "# React-portfolio-website`n`nReact project."
            "package.json" = "{`"name`": `"react-portfolio-website`", `"dependencies`": { `"react`": `"^18.2.0`" } }"
        }
        commits = @(
            @{ hash="a1b2c3d"; message="Set up React App boilerplate"; date="2026-07-05T14:00:00Z" }
        )
    },
    @{
        name = "Online-Courses"
        owner = "lamberavi"
        desc = "Online E-Platform for Learning with different computer languages Using Html CSS JavaScript."
        stars = 0
        forks = 0
        lang = "HTML"
        private = $false
        files = @{
            "README.md" = "# Online Courses`n`nE-Platform course catalog code."
            "index.html" = "<h1>Course learning dashboard</h1>"
        }
        commits = @(
            @{ hash="1a2b3c4"; message="Create homepage mock layout"; date="2026-07-08T11:20:00Z" }
        )
    },
    @{
        name = "E-Commerce"
        owner = "lamberavi"
        desc = "Complete online store client catalog page with filter settings, cart state, and custom CSS frames."
        stars = 0
        forks = 0
        lang = "HTML"
        private = $false
        files = @{
            "README.md" = "# E-Commerce`n`nHTML/CSS e-commerce catalog page."
            "index.html" = "<h1>Store Products</h1>"
        }
        commits = @(
            @{ hash="9e8d7c6"; message="Add item cards dynamic listing"; date="2026-07-10T15:30:00Z" }
        )
    }
)

foreach ($repo in $extraRepos) {
    $repoDir = Join-Path $baseDir $repo.name
    if (-not (Test-Path $repoDir)) {
        New-Item -ItemType Directory -Path $repoDir | Out-Null
    }

    $files = $repo.files
    foreach ($key in $files.Keys) {
        $filePath = Join-Path $repoDir $key
        $files[$key] | Out-File -FilePath $filePath -Encoding utf8 -Force
    }

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
        issues = @()
        pullRequests = @()
    }
    
    $metaJson = $meta | ConvertTo-Json -Depth 5
    $metaJsonPath = Join-Path $repoDir "repo.json"
    $metaJson | Out-File -FilePath $metaJsonPath -Encoding utf8 -Force
}

Write-Host "Created extra repos successfully!" -ForegroundColor Green
