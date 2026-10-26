
/* =====================================
   SAFE MALWARE SIMULATOR
   Virus, Worm and Trojan
   Visual simulation only
===================================== */


/* =====================================
   1. VIRUS SIMULATION
===================================== */

let virusRunning = false;

async function runVirus() {
    if (virusRunning) return;

    virusRunning = true;
    resetWorm();
    
    const virus = document.getElementById("virusIcon");
    const status = document.getElementById("virus-status");

    const files = [
        document.getElementById("vfile1"),
        document.getElementById("vfile2"),
        document.getElementById("vfile3")
    ];

    if (!virus || !status || files.some(file => !file)) {
        virusRunning = false;
        return;
    }

    files.forEach(file => file.classList.remove("infected"));

    virus.style.transition = "none";
    virus.style.left = "0px";
    virus.style.top = "40px";
    virus.style.opacity = "1";

    await new Promise(resolve => setTimeout(resolve, 100));

    virus.style.transition = "left 0.8s ease-in-out, top 0.8s ease-in-out";

    for (let i = 0; i < files.length; i++) {
        if (!virusRunning) return;

        const file = files[i];

        status.textContent = "Scanning " + file.textContent.trim() + "...";

        const area = document.querySelector(".virus-area");
        const areaRect = area.getBoundingClientRect();
        const fileRect = file.getBoundingClientRect();

        const targetLeft =
            fileRect.left - areaRect.left +
            fileRect.width / 2 -
            virus.offsetWidth / 2;

        const targetTop =
            fileRect.top - areaRect.top +
            fileRect.height / 2 -
            virus.offsetHeight / 2;

        virus.style.left = targetLeft + "px";
        virus.style.top = targetTop + "px";

        await new Promise(resolve => setTimeout(resolve, 900));

        if (!virusRunning) return;

        file.classList.add("infected");
        status.textContent =
            "Simulated infection: " + file.textContent.trim();

        await new Promise(resolve => setTimeout(resolve, 600));
    }

    if (virusRunning) {
        status.textContent =
            "Simulation complete! All demo files are marked infected.";
        virusRunning = false;
    }
}


function resetVirus() {
    virusRunning = false;

    const virus = document.getElementById("virusIcon");
    const status = document.getElementById("virus-status");

    if (virus) {
        virus.style.opacity = "0";
        virus.style.left = "0px";
        virus.style.top = "40px";
    }

    document.querySelectorAll("#virus .file").forEach(file => {
        file.classList.remove("infected");
    });

    if (status) {
        status.textContent = "Ready to simulate.";
    }
}


/* =====================================
   2. WORM SIMULATION
===================================== */

let wormTimer = null;
let wormRunning = false;

function runWorm() {
    resetWorm();

    const status = document.getElementById("worm-status");

    // Support the PC elements from the website
    const pcs = [
        document.getElementById("pc1"),
        document.getElementById("pc2"),
        document.getElementById("pc3"),
        document.getElementById("pc4")
    ].filter(Boolean);

    if (!status || pcs.length === 0) {
        if (status) {
            status.textContent =
                "PC elements were not found. Check the HTML IDs.";
        }
        return;
    }

    wormRunning = true;
    let index = 0;

    status.textContent = "Starting safe worm simulation...";

    wormTimer = setInterval(() => {
        if (!wormRunning) return;

        if (index > 0) {
            pcs[index - 1].classList.remove("active");
        }

        if (index < pcs.length) {
            pcs[index].classList.add("active");

            status.textContent =
                "Simulated worm reached PC-" +
                String.fromCharCode(65 + index);

            index++;
        } else {
            clearInterval(wormTimer);
            wormTimer = null;
            wormRunning = false;

            status.textContent =
                "Simulation complete! All demo PCs were highlighted.";
        }
    }, 1000);
}


function resetWorm() {
    wormRunning = false;

    if (wormTimer !== null) {
        clearInterval(wormTimer);
        wormTimer = null;
    }

    document.querySelectorAll(".pc").forEach(pc => {
        pc.classList.remove("active");
    });

    const status = document.getElementById("worm-status");

    if (status) {
        status.textContent = "Ready to simulate.";
    }
}


/* =====================================
   3. TROJAN SIMULATION
===================================== */


/* TROJAN VISUAL SIMULATION */

function runTrojan() {
    const app = document.getElementById("trojan-demo");
    const status = document.getElementById("trojan-status");

    if (!app || !status) {
        alert("Trojan section not found. Check index.html.");
        return;
    }

    app.classList.add("infected");
    app.style.border = "2px solid #ff4d6d";
    app.style.background = "#351522";
    app.style.boxShadow = "0 0 25px rgba(255, 77, 109, 0.7)";

    status.innerHTML = `
        <strong style="color:#ff4d6d; font-size:20px;">
            ⚠️ SECURITY WARNING!
        </strong>
        <br><br>
        🚨 Unknown Publisher Detected<br>
        🔍 Application is suspicious<br>
        🛡️ Recommended Action: Do not trust this app<br>
        <br>
        <span style="color:#7ee787;">
            Demo complete — no real application was executed.
        </span>
    `;
}

function resetTrojan() {
    const app = document.getElementById("trojan-demo");
    const status = document.getElementById("trojan-status");

    if (app) {
        app.classList.remove("infected");
        app.style.border = "";
        app.style.background = "";
        app.style.boxShadow = "";
    }

    if (status) {
        status.textContent = "Ready to simulate.";
    }
}



/* =====================================
   4. RESET ALL SIMULATIONS
===================================== */

function resetAll() {
    resetVirus();
    resetWorm();
    resetTrojan();
}


/* =====================================
   5. STARTUP MESSAGE
===================================== */

document.addEventListener("DOMContentLoaded", function () {
    console.log("Safe Malware Simulator loaded successfully.");
    console.log("This website performs visual simulations only.");
});
