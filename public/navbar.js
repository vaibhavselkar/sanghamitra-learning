document.addEventListener('DOMContentLoaded', () => {
    function loadNavbar() {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-placeholder').innerHTML = data;
                checkAuth();
                console.log("Navbar loaded and checking auth");
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
                showError('Error loading navbar');
            });
    }

    function showError(message) {
        const errorContainer = document.getElementById('error-container');
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }

    function checkAuth() {
        fetch('https://sanghamitra-learning-backend.vercel.app/check-auth', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            const authButton = document.getElementById('authButton');
            if (data.authenticated) {
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
                                location.replace('index.html');
                            } else {
                                const errorData = await response.json();
                                console.error('Logout failed:', errorData.message);
                                showError('Logout failed: ' + errorData.message);
                            }
                        } catch (error) {
                            console.error('Error during logout:', error);
                            showError('Error during logout: ' + error.message);
                        }
                    } else {
                        console.log("Logout cancelled");
                    } 
                };
            } else {
                console.log("User is not authenticated");
                authButton.textContent = 'Login';
                authButton.classList.remove('btn-danger');
                authButton.classList.add('btn-success');
                authButton.onclick = () => {
                    window.location.href = 'user_login.html';
                };
            }
        })
        .catch(error => {
            console.error('Error checking authentication:', error);
            showError('Error checking authentication: ' + error.message);
        });
    }

    loadNavbar();
});
