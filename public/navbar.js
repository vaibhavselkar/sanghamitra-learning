// navbar.js
document.addEventListener('DOMContentLoaded', () => {
    // Function to load the navbar HTML
    function loadNavbar() {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-placeholder').innerHTML = data;
                checkAuth();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }

    // Function to check authentication and update the navbar
    function checkAuth() {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwtoken='));

        const authButton = document.getElementById('authButton');

        if (jwtCookie) {
            // User is logged in, show Logout button
            authButton.textContent = 'Logout';
            authButton.classList.remove('btn-success');
            authButton.classList.add('btn-danger');
            authButton.onclick = async (event) => {
                event.preventDefault();
                try {
                    const response = await fetch('https://sanghamitra-learning-backend.vercel.app/logout', {
                        method: 'GET',
                        credentials: 'include'
                    });
                    if (response.ok) {
                        // Successfully logged out
                        document.cookie = 'jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        window.location.href = 'index.html';
                    } else {
                        console.error('Logout failed');
                    }
                } catch (error) {
                    console.error('Error during logout:', error);
                }
            };
        } else {
            // User is not logged in, show Login button
            authButton.textContent = 'Login';
            authButton.classList.remove('btn-danger');
            authButton.classList.add('btn-success');
            authButton.onclick = () => {
                window.location.href = 'user_login.html';
            };
        }
    }

    loadNavbar();
});
