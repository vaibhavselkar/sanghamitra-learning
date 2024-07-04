document.addEventListener('DOMContentLoaded', () => {
    // Function to load the navbar HTML
    function loadNavbar() {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-placeholder').innerHTML = data;
                checkAuth();
                console.log("Navbar loaded and checking auth");
            })
            .catch(error => console.error('Error loading navbar:', error));
    }

    // Function to check authentication and update the navbar
    function checkAuth() {
        fetch('https://sanghamitra-learning-backend.vercel.app/check-auth', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            const authButton = document.getElementById('authButton');
            if (data.authenticated) {
                // User is logged in, show Logout button
                console.log("User is authenticated");
                authButton.textContent = 'Logout';
                authButton.classList.remove('btn-success');
                authButton.classList.add('btn-danger');
                authButton.onclick = async (event) => {
                    event.preventDefault();
                    console.log("Logout button clicked");
                    const confirmLogout = window.confirm("Do you really want to logout?");
                    if (confirmLogout) {
                        try {
                            const response = await fetch('https://sanghamitra-learning-backend.vercel.app/logout', {
                                method: 'GET',
                                credentials: 'include'
                            });
                            if (response.ok) {
                                console.log("Logout successful");
                                document.cookie = 'jwtoken=; Domain=sanghamitra-learning.vercel.app; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure';
                                location.replace('index.html');
                            } else {
                                console.error('Logout failed');
                            }
                        } catch (error) {
                            console.error('Error during logout:', error);
                        }
                    } else {
                        console.log("Logout cancelled");
                    } 
                };
            } else {
                // User is not logged in, show Login button
                console.log("User is not authenticated");
                authButton.textContent = 'Login';
                authButton.classList.remove('btn-danger');
                authButton.classList.add('btn-success');
                authButton.onclick = () => {
                    window.location.href = 'user_login.html';
                };
            }
        })
        .catch(error => console.error('Error checking authentication:', error));
    }

    // Function to check authentication again after attempting to log out
    async function checkAuthAgain() {
        try {
            const response = await fetch('https://sanghamitra-learning-backend.vercel.app/check-auth', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (data.authenticated) {
                // User is still logged in, try to log out again
                console.log("Retrying logout...");
                try {
                    const response = await fetch('https://sanghamitra-learning-backend.vercel.app/logout', {
                        method: 'GET',
                        credentials: 'include'
                    });
                    if (response.ok) {
                        console.log("Logout successful on retry");
                        // Redirect to index page and prevent going back
                        location.replace('index.html');
                    } else {
                        console.error('Logout failed on retry');
                    }
                } catch (error) {
                    console.error('Error during logout on retry:', error);
                }
            } else {
                console.log("User successfully logged out");
            }
        } catch (error) {
            console.error('Error checking authentication again:', error);
        }
    }

    loadNavbar();
});
