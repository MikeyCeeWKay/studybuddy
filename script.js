document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const correctPassword = "pl";
    
    if (password === correctPassword) {
        window.location.href = "main/main.html";
    } else {
        document.getElementById('error-message').textContent = "Incorrect code. Try again.";
    }
});