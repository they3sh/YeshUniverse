// ======== Skills ========
const tools = ["Roblox API", "ProfileService", "ProfileStore", "Replica", "Promise", "VSCode", "Rojo", "Git", "React-roblox-ts", "React-Luau"];
const languages = ["Lua", "Luau", "TypeScript", "roblox-ts", "JavaScript"];

const renderTags = (list, containerId) => {
    const container = document.getElementById(containerId);
    list.forEach(item => {
        const span = document.createElement('span');
        span.className = "tech-tag";
        span.innerText = item;
        container.appendChild(span);
    });
};

renderTags(tools, 'tools-container');
renderTags(languages, 'languages-container');

// ==================== TAB SWITCH ====================
function showTab(type) {
    document.querySelectorAll('.grid').forEach(g => g.classList.remove('active-tab'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    if (type === 'projects') {
        document.getElementById('projects-grid').classList.add('active-tab');
        document.querySelector('.tab-btn[onclick*="projects"]').classList.add('active');
    } else if (type === 'mechanics') {
        document.getElementById('mechanics-grid').classList.add('active-tab');
        document.querySelector('.tab-btn[onclick*="mechanics"]').classList.add('active');
    }
}

// ==================== LOAD PROJECTS AND MECHANICS ====================
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';

    for (const file of PortfolioData.projectFiles) {
        try {
            const res = await fetch(`ProjectsConfig/${file}`);
            const data = await res.json();
            createProjectButton(projectsGrid, data);
        } catch (e) {
            console.error("Error loading project JSON:", e);
        }
    }
}

async function loadMechanics() {
    const mechanicsGrid = document.getElementById('mechanics-grid');
    mechanicsGrid.innerHTML = '';

    for (const file of PortfolioData.mechanicsFiles) {
        try {
            const res = await fetch(`ProjectsConfig/${file}`);
            const data = await res.json();
            createMechanicButton(mechanicsGrid, data);
        } catch (e) {
            console.error("Error loading mechanic JSON:", e);
        }
    }
}

// ==================== CREATE BUTTONS ====================
function createProjectButton(container, data) {
    const btn = document.createElement('div');
    btn.className = 'project-btn';
    btn.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="project-text">
            <h4>${data.title} <button class="solo-btn">solo</button></h4>
            <p>${data.description}</p>
        </div>
    `;
    container.appendChild(btn);

    btn.querySelector('.solo-btn').addEventListener('click', () => openProjectModal(data));
}

function createMechanicButton(container, data) {
    const btn = document.createElement('div');
    btn.className = 'mechanic-btn';
    btn.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="mechanic-text">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
        </div>
    `;
    container.appendChild(btn);

    btn.addEventListener('click', () => alert(`Mechanic: ${data.title}`));
}

// ==================== MODAL ====================
function openProjectModal(data) {
    let modal = document.getElementById('project-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2 id="modal-title"></h2>
                <div class="modal-body">
                    <div class="modal-mechanics"></div>
                    <div class="modal-libs"></div>
                    <div class="modal-video"></div>
                </div>
                <a id="modal-project-link" target="_blank" class="btn">Go to Project</a>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    modal.querySelector('#modal-title').innerText = data.title;
    modal.querySelector('.modal-mechanics').innerHTML = '<h4>Mechanics:</h4>' + data.mechanics.map(m => `<div class="frame-small">${m}</div>`).join('');
    modal.querySelector('.modal-libs').innerHTML = '<h4>Libs:</h4>' + data.libs.map(l => `<div class="frame-small">${l}</div>`).join('');
    modal.querySelector('.modal-video').innerHTML = `<iframe width="100%" height="360" src="${data.youtube}" frameborder="0" allowfullscreen></iframe>`;
    modal.querySelector('#modal-project-link').href = data.projectLink;

    modal.style.display = 'flex';
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadMechanics();
    showTab('projects');
});


const pricingData = [
    { name: "Per-Task Commissions", price: "2000R$ - $10+", desc: "Individual features" },
    { name: "Simple Gameplay", price: "$150+", desc: "Basic game loops" },
    { name: "Medium Gameplay", price: "$350+", desc: "Medium Difficulty Gameplay" },
    { name: "Complex Gameplay", price: "$900+", desc: "Complex Gameplay" },
    { name: "Anticheat (S/M/C)", price: "$50 - $300+", desc: "Project dependent" },
    { name: "Monetization", price: "$50 - $150+", desc: "Standard to Complex" }
];

const pGrid = document.getElementById('pricing-grid');
pricingData.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pricing-card';
    card.innerHTML = `
        <div>
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
        </div>
        <span>${p.price}</span>`;
    pGrid.appendChild(card);
});