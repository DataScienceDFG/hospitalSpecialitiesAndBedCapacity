// Function to validate login credentials
function validateLogin() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;

    // Read the credentials from the CSV file (You can replace the URL with your actual CSV file path)
    var csvFileURL = 'credentials.csv';

    Papa.parse(csvFileURL, {
        download: true,
        header: true,
        complete: function (results) {
            var credentials = results.data;
            var loggedIn = false;

            // Check if the provided username and password match any entry in the CSV data
            for (var i = 0; i < credentials.length; i++) {
                if (
                    credentials[i].username === username &&
                    credentials[i].password === password
                ) {
                    loggedIn = true;
                    break;
                }
            }

            if (loggedIn) {
                var userKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                sessionStorage.setItem('userKey', userKey);
                window.location.href = 'dashboard.html?userKey=' + userKey;
                return;
                // Redirect to dashboard.html after successful login
                // window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        },
    });
}


// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    console.log('Form submitted'); // Check if the form submit event is triggered
    validateLogin();
});

