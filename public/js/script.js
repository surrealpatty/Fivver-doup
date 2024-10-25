async function registerUser(username, password) {
    const feedbackElement = document.getElementById('feedback'); // Element for feedback messages
    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response
            feedbackElement.textContent = 'Registration failed: ' + errorMessage;
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('User registered:', data);
        feedbackElement.textContent = 'User registered successfully!'; // Success message
        document.getElementById('registrationForm').reset(); // Clear form fields
    } catch (error) {
        console.error('Error:', error);
        feedbackElement.textContent = 'Error: ' + error.message; // Show error message
    }
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    const feedbackElement = document.getElementById('feedback'); // Element for feedback messages
    if (!username || !password) {
        feedbackElement.textContent = 'Please fill out all fields.';
        return;
    }

    registerUser(username, password);
});
