// DOM Elements
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Input Fields & Errors
const inputs = {
    regName: document.getElementById("regName"),
    regEmail: document.getElementById("regEmail"),
    regPassword: document.getElementById("regPassword"),
    regConfirm: document.getElementById("regConfirm"),
    loginEmail: document.getElementById("loginEmail"),
    loginPassword: document.getElementById("loginPassword")
};

const errors = {
    regName: document.getElementById("regNameError"),
    regEmail: document.getElementById("regEmailError"),
    regPassword: document.getElementById("regPasswordError"),
    regConfirm: document.getElementById("regConfirmError"),
    loginEmail: document.getElementById("loginEmailError"),
    loginPassword: document.getElementById("loginPasswordError")
};

// Switch between Login and Register
function showRegister() {
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
    clearErrors();
}

function showLogin() {
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
    clearErrors();
}

// Clear all error messages
function clearErrors() {
    Object.values(errors).forEach(error => error.textContent = "");
}

// Toggle password visibility
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.classList.toggle("fa-eye", !isPassword);
    icon.classList.toggle("fa-eye-slash", isPassword);
}

// Register Form Submission
registerForm.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    // Validate Name
    if (inputs.regName.value.trim().length < 3) {
        errors.regName.textContent = "Name must be at least 3 characters";
        valid = false;
    }

    // Validate Email
    if (!/\S+@\S+\.\S+/.test(inputs.regEmail.value)) {
        errors.regEmail.textContent = "Invalid email address";
        valid = false;
    }

    // Validate Password Length
    if (inputs.regPassword.value.length < 6) {
        errors.regPassword.textContent = "Password must be at least 6 characters";
        valid = false;
    }

    // Confirm Password Match
    if (inputs.regPassword.value !== inputs.regConfirm.value) {
        errors.regConfirm.textContent = "Passwords do not match";
        valid = false;
    }

    if (!valid) return;

    // Save user to localStorage
    const user = {
        name: inputs.regName.value.trim(),
        email: inputs.regEmail.value.toLowerCase(),
        password: inputs.regPassword.value
    };

    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Redirecting to Dashboard...",
        timer: 1500,
        showConfirmButton: false,
        background: '#1e1e28',
        color: '#fff'
    }).then(() => {
        window.location.href = "apps/dashboard.html";
    });
});

// Login Form Submission
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();

    const email = inputs.loginEmail.value.toLowerCase();
    const password = inputs.loginPassword.value;

    // Basic validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        errors.loginEmail.textContent = "Invalid email address";
        return;
    }

    if (password.length < 6) {
        errors.loginPassword.textContent = "Password too short";
        return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        errors.loginPassword.textContent = "No account found. Please register.";
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.password === password) {
        Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back!",
            timer: 1500,
            showConfirmButton: false,
            background: '#1e1e28',
            color: '#fff'
        }).then(() => {
            window.location.href = "apps/dashboard.html";
        });
    } else {
        errors.loginPassword.textContent = "Invalid email or password";
    }
});