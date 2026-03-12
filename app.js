// Mock Data
const proposals = [
    {
        id: 1,
        title: "Repair Main Road Network",
        desc: "Complete resurfacing of the main arterial roads.",
        constituency: "North District",
        deadline: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        dateSubmitted: "2026-02-15",
        status: "In Progress"
    },
    {
        id: 2,
        title: "New Public Library Construction",
        desc: "Building a state-of-the-art public library with digital resources.",
        constituency: "East Region",
        deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        dateSubmitted: "2026-01-10",
        status: "In Progress"
    }
];

const activePolls = [
    {
        id: 101,
        title: "Upgrade Street Lighting to LED",
        desc: "Promise to replace 500 faulty street lights with energy-efficient LEDs.",
        constituency: "North District",
        candidate: "Hon. Rajesh Kumar",
        endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days left to vote
    },
    {
        id: 102,
        title: "Clean Drinking Water Initiative",
        desc: "Installation of 20 RO water purifiers in public areas.",
        constituency: "South District",
        candidate: "Hon. Priya Singh",
        endDate: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days left to vote
    }
];

const pastResults = [
    {
        id: 201,
        title: "Govt School Renovation",
        constituency: "West Region",
        rating: 9.2,
        votes: { yes: 85, partial: 10, no: 5 },
        totalVotes: 1250
    },
    {
        id: 202,
        title: "New Bus Shelter Installation",
        constituency: "North District",
        rating: 4.5,
        votes: { yes: 20, partial: 30, no: 50 },
        totalVotes: 890
    }
];

// Load UI
document.addEventListener("DOMContentLoaded", () => {
    // Scroll behavior for nav
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    renderProposals();
    renderActivePolls();
    renderPastResults();
    
    if(document.getElementById('candidate-table-body')) {
        renderCandidateTable();
    }
});

function calculateDaysLeft(deadline) {
    const diff = deadline - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function renderProposals() {
    const container = document.getElementById("proposals-container");
    if (!container) return;
    
    container.innerHTML = "";
    proposals.forEach(p => {
        const daysLeft = calculateDaysLeft(p.deadline);
        const progressPercent = Math.min(100, Math.max(0, 100 - (daysLeft * 5))); // Fake progress based on time
        
        container.innerHTML += `
            <div class="proposal-item glass-card">
                <div class="proposal-date">
                    <span class="badge badge-blue">Submitted</span><br>
                    <small>${p.dateSubmitted}</small>
                </div>
                <div class="proposal-title">
                    <h4>${p.title}</h4>
                    <p><i class="fa-solid fa-map-marker-alt"></i> ${p.constituency}</p>
                </div>
                <div class="timeline-tracker">
                    <div class="timeline-info">
                        <span>Timeline</span>
                        <span>${daysLeft} days left</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress blue" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                <div class="proposal-status">
                    <span class="badge badge-warning"><i class="fa-solid fa-clock"></i> In Progress</span>
                </div>
            </div>
        `;
    });
}

function renderActivePolls() {
    const container = document.getElementById("polls-container");
    if (!container) return;
    
    container.innerHTML = "";
    activePolls.forEach(poll => {
        const daysLeft = calculateDaysLeft(poll.endDate);
        
        container.innerHTML += `
            <div class="poll-card glass-card">
                <div class="poll-meta">
                    <span class="badge badge-saffron">${poll.constituency}</span>
                    <span class="timer"><i class="fa-solid fa-hourglass-end"></i> ${daysLeft} days left</span>
                </div>
                <h3>${poll.title}</h3>
                <p class="poll-desc">${poll.desc}</p>
                <div class="poll-footer">
                    <small class="text-light">By: ${poll.candidate}</small>
                    <button class="btn btn-primary btn-sm vote-btn" data-id="${poll.id}" data-title="${poll.title}" data-const="${poll.constituency}">Cast Vote</button>
                </div>
            </div>
        `;
    });

    // Attach vote events
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openVoteModal(e.target.dataset.title, e.target.dataset.const);
        });
    });
}

function renderPastResults() {
    const container = document.getElementById("results-container");
    if (!container) return;
    
    container.innerHTML = "";
    pastResults.forEach(res => {
        const getBadgeColor = (rating) => {
            if(rating >= 8) return 'success';
            if(rating >= 5) return 'warning';
            return 'danger';
        };
        const color = getBadgeColor(res.rating);
        
        container.innerHTML += `
            <div class="result-card glass-card border-${color}">
                <div class="result-header">
                    <h3>${res.title}</h3>
                    <small class="text-light"><i class="fa-solid fa-map-marker-alt"></i> ${res.constituency}</small>
                </div>
                <div class="result-stats">
                    <p><strong>Total Verifications:</strong> ${res.totalVotes}</p>
                    <div class="progress-container mt-3">
                        <div class="progress-info" style="font-size: 0.8rem">
                            <span>Yes (${res.votes.yes}%)</span>
                            <span>Partial (${res.votes.partial}%)</span>
                            <span>No (${res.votes.no}%)</span>
                        </div>
                        <div class="progress-bar" style="display: flex; height: 8px;">
                            <div class="progress success" style="width: ${res.votes.yes}%"></div>
                            <div class="progress warning" style="width: ${res.votes.partial}%"></div>
                            <div class="progress danger" style="width: ${res.votes.no}%"></div>
                        </div>
                    </div>
                </div>
                <div class="rating-box">
                    <p>Final Accountability Rating</p>
                    <h2 class="text-${color}">${res.rating}<span style="font-size: 1rem; color: #64748b">/10</span></h2>
                </div>
            </div>
        `;
    });
}

function renderCandidateTable() {
    const tbody = document.getElementById('candidate-table-body');
    const allProjects = [...pastResults.map(p => ({...p, status: 'Completed', deadline: 'Ended'})), ...proposals];
    
    tbody.innerHTML = "";
    allProjects.forEach(p => {
        const isCompleted = p.status === 'Completed';
        tbody.innerHTML += `
            <tr>
                <td><strong>${p.title}</strong></td>
                <td><span class="badge badge-${isCompleted ? 'success' : 'blue'}">${p.status || 'Active'}</span></td>
                <td>${isCompleted ? 'Poll Closed' : p.deadline.toLocaleDateString()}</td>
                <td>${isCompleted ? `<strong class="text-success">${p.rating}/10</strong>` : '<span class="text-light">Waiting for poll</span>'}</td>
                <td><button class="btn btn-sm btn-outline">View Details</button></td>
            </tr>
        `;
    });
}

// Modal Logic
const modal = document.getElementById("voting-modal");
const closeBtn = document.querySelector(".close-modal");
const submitBtn = document.getElementById("submit-vote-btn");

function openVoteModal(title, constituency) {
    if(!modal) return;
    document.getElementById("modal-poll-title").textContent = title;
    document.getElementById("modal-poll-constituency").textContent = constituency;
    
    // Reset modal state
    document.querySelector(".modal-body").classList.remove("hidden");
    document.getElementById("modal-success").classList.add("hidden");
    document.querySelectorAll('input[name="vote"]').forEach(r => r.checked = false);
    document.getElementById("voter-feedback").value = "";
    
    modal.classList.add("active");
}

if(closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

if(submitBtn) {
    submitBtn.addEventListener("click", () => {
        const selected = document.querySelector('input[name="vote"]:checked');
        if (!selected) {
            alert("Please select an option to submit your vote.");
            return;
        }
        
        // Mock API Call
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying Identity...';
        
        setTimeout(() => {
            document.querySelector(".modal-body").classList.add("hidden");
            document.getElementById("modal-success").classList.remove("hidden");
            submitBtn.innerHTML = 'Submit Verification Vote';
            
            setTimeout(() => {
                modal.classList.remove("active");
            }, 2500);
        }, 1500);
    });
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("active");
    }
}
