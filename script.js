// ======== Skills ========
const tools = ["Roblox API", "ProfileService", "ProfileStore", "Replica", "Promise", "VSCode", "Rojo", "Git", "React-rbxts", "React-Luau"];
const languages = ["Lua", "Luau", "roblox-ts", "TypeScript", "JavaScript"];

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
            const res = await fetch(`MechanicsConfig/${file}`);
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

    const soloBadge = data.solo
        ? `<span class="solo-btn">solo</span>`
        : '';

    btn.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="project-text">
            <h4>${data.title} ${soloBadge}</h4>
            <p>${data.description}</p>
        </div>
    `;

    container.appendChild(btn);

    btn.addEventListener('click', () => {
        openProjectModal(data);
    });
}

function createMechanicButton(container, data) {
    const btn = document.createElement('div');
    btn.className = 'project-btn';
    btn.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="project-text">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
        </div>
    `;

    container.appendChild(btn);

    btn.addEventListener('click', () => {
        openProjectModal(data);
    });
}

// ==================== MODAL ====================
function openProjectModal(data) {
    const modal = document.getElementById('project-modal');

    modal.querySelector('#modal-title').innerText = data.title;
    modal.querySelector('#modal-mechanics').innerHTML =
        data.mechanics.map(m => `<div class="frame-small">${m}</div>`).join('');
    modal.querySelector('#modal-libs').innerHTML =
        data.libs.map(l => `<div class="frame-small">${l}</div>`).join('');
    modal.querySelector('#modal-video').src = data.youtube;
    modal.querySelector('#modal-project-link').href = data.projectLink;

    modal.style.display = 'flex';

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadMechanics();
    showTab('projects');
});

const pricingData = [
    { name: "Hourly", price: "1.000R$+ | $10+", desc: "Per-Hour" },
    { name: "Per-Task Commissions", price: "3.000R$+ | $15+", desc: "Individual features" },
    { name: "Simple Gameplay", price: "20.000R$+ | $100+", desc: "Basic game loops" },
    { name: "Medium Gameplay", price: "60.000R$+ | $300+", desc: "Medium Difficulty Gameplay" },
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