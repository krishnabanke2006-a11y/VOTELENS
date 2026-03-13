function switchRole(role) {
    // Update button styles
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show correct form
    const forms = document.querySelectorAll('.form-section');
    forms.forEach(form => form.classList.remove('active'));

    if (role === 'voter') {
        buttons[0].classList.add('active');
        document.getElementById('voterForm').classList.add('active');
    } else {
        buttons[1].classList.add('active');
        document.getElementById('candidateForm').classList.add('active');
    }
}

function generateRandomNumericID(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function handleRegister(event, role) {
    event.preventDefault();
    
    // Basic simulation of email check
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const existingUsers = JSON.parse(localStorage.getItem('voteLensUsers')) || [];
    
    const userExists = existingUsers.some(u => u.email === email);
    if (userExists) {
        alert("This email is already registered!");
        return;
    }

    // Generate unique ID
    let generatedId = '';
    if (role === 'voter') {
        generatedId = `VOTE-${generateRandomNumericID(5)}`;
    } else {
        generatedId = `CAND-${generateRandomNumericID(5)}`;
    }

    // Store in mock DB
    const newUser = {
        uniqueId: generatedId,
        role: role,
        name: formData.get('fullName'),
        email: email,
        // Using base64 to superficially 'encode' the password instead of plain text
        passwordHash: btoa(formData.get('password')),
        timestamp: new Date().toISOString()
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('voteLensUsers', JSON.stringify(existingUsers));

    // Hide forms, show success
    document.getElementById('registrationForms').style.display = 'none';
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    
    document.getElementById('displayId').innerText = generatedId;
}

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
    // Attach listener
    document.getElementById('voterForm').addEventListener('submit', (e) => handleRegister(e, 'voter'));
    document.getElementById('candidateForm').addEventListener('submit', (e) => handleRegister(e, 'candidate'));
});
