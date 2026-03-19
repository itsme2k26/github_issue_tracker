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

        div.className = "bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"

        div.innerHTML = `
    <!-- TOP BAR -->
    <div class="h-1 ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"}"></div>

    <div class="p-4 space-y-3">

        <!-- PRIORITY -->
        <div class="flex justify-between items-center">
            <span class="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>

            <span class="text-xs px-3 py-1 rounded-full font-medium
                ${issue.priority === "high"
                ? "bg-red-100 text-red-500"
                : issue.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-500"
            }
            ">
                ${issue.priority.toUpperCase()}
            </span>
        </div>

        <!-- TITLE -->
        <h3 class="font-semibold text-sm leading-5">
            ${issue.title}
        </h3>

        <!-- DESCRIPTION -->
        <p class="text-xs text-gray-500">
            ${issue.description.slice(0, 70)}...
        </p>

        <!-- LABELS -->
        <div class="flex gap-2 flex-wrap text-xs">
            ${issue.label === "bug"
                ? `<span class="bg-red-100 text-red-500 px-2 py-1 rounded-full">BUG</span>`
                : ""
            }

            ${issue.label === "help wanted"
                ? `<span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">HELP WANTED</span>`
                : ""
            }

            ${issue.label === "enhancement"
                ? `<span class="bg-green-100 text-green-600 px-2 py-1 rounded-full">ENHANCEMENT</span>`
                : ""
            }
        </div>

    </div>

    <!-- FOOTER -->
    <div class="border-t px-4 py-3 text-xs text-gray-400">
        <p>#1 by ${issue.author}</p>
        <p>${issue.createdAt}</p>
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


// MODAL Open
async function openModal(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json()
    const issue = data.data

    modalTitle.innerText = issue.title
    modalDesc.innerText = issue.description
    modalAuthor.innerText = "Author: " + issue.author
    modalPriority.innerText = "Priority: " + issue.priority
    modalLabel.innerText = "Label: " + issue.label
    modalDate.innerText = issue.createdAt

    modal.classList.remove("hidden")
    modal.classList.add("flex")
}

// MODAL close

function closeModal() {
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal()
})