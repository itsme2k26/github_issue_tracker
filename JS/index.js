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

