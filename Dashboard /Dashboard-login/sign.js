// Import the Firebase configuration
import { app, auth, database } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Set up register function
function register() {
    // Get all input fields
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Validate input
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is incorrect');
        return;
    }

    // Validate input
    if (!validate_field(role) || !validate_field(username)) {
        alert('Username or Role is incorrect');
        return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Add created user to Firebase Database
            const databaseRef = ref(database);

            // Create User data
            const userData = {
                email: email,
                username: username,
                role: role,
                last_login: new Date().toISOString()
            };

            // Set user data in the database
            set(databaseRef.child('users/' + user.uid), userData)
                .then(() => {
                    alert('User registered successfully');
                })
                .catch((error) => {
                    alert('Error adding user to the database: ' + error.message);
                });
        })
        .catch((error) => {
            alert('Error creating user: ' + error.message);
        });
}

function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field && field.length > 0;
}

// Register function button call 
document.getElementById('register').addEventListener('click', register);
