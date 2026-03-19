let allIssues = []

// LOGIN
function login() {
    const user = document.getElementById("username").value
    const pass = document.getElementById("password").value

    if (user === "admin" && pass === "admin123") {
        window.location.href = "issue.html"
    } else {
        alert("Wrong credentials")
    }
}

// LOAD ISSUES
async function loadIssues() {

    const spinner = document.getElementById("spinner")
    spinner.classList.remove("hidden")

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    allIssues = data.data

    displayIssues(allIssues)

    spinner.classList.add("hidden")
}

// DISPLAY
function displayIssues(issues) {

    const container = document.getElementById("issuesContainer")
    container.innerHTML = ""

    document.getElementById("issueCount").innerText = issues.length + " Issues"

    issues.forEach(issue => {

        const div = document.createElement("div")

        div.className = "bg-white rounded shadow cursor-pointer"

        div.innerHTML = `
            <div class="h-1 ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"}"></div>

            <div class="p-4">

                <h3 class="font-semibold text-sm mb-2">${issue.title}</h3>

                <p class="text-xs text-gray-500 mb-2">
                    ${issue.description.slice(0, 60)}...
                </p>

                <div class="flex justify-between text-xs text-gray-400">
                    <span>${issue.author}</span>
                    <span>${issue.createdAt}</span>
                </div>

            </div>
        `

        div.onclick = () => openModal(issue.id)

        container.appendChild(div)
    })
}

// FILTER
function filterTab(type, e) {

    document.querySelectorAll(".tab").forEach(btn => {
        btn.classList.remove("bg-indigo-600", "text-white")
        btn.classList.add("bg-gray-200")
    })

    e.target.classList.add("bg-indigo-600", "text-white")

    if (type === "all") {
        displayIssues(allIssues)
    } else {
        displayIssues(allIssues.filter(i => i.status === type))
    }
}

// SEARCH
async function searchIssues() {

    const text = document.getElementById("searchInput").value

    if (!text) {
        displayIssues(allIssues)
        return
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
    const data = await res.json()

    displayIssues(data.data)
}

