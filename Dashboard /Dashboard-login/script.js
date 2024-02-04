// Sample data structure to store user credentials
const users = [];

function signIn() {
    const username = document.getElementById('signinUsername').value;
    const password = document.getElementById('signinPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('signInError').textContent = '';
        alert('Sign In Successful!');
    } else {
        document.getElementById('signInError').textContent = 'Invalid username or password.';
    }
}

function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('userRole').value;

    // Check if the username is already taken
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        document.getElementById('signUpSuccess').textContent = '';
        document.getElementById('signUpError').textContent = 'Username is already taken.';
    } else {
        // Register the new user
        users.push({ username, password,role });
        document.getElementById('signUpSuccess').textContent = 'Sign Up Successful!';
        document.getElementById('signUpError').textContent = '';
    }
}
