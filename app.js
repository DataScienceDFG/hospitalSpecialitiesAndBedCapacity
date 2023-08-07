function validateLogin() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;

    var csvFileURL = 'credentials.csv';

    Papa.parse(csvFileURL, {
        download: true,
        header: true,
        complete: function (results) {
            var credentials = results.data;
            var loggedIn = false;

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
            } else {
                alert('Invalid username or password');
            }
        },
    });
}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    console.log('Form submitted'); 
    validateLogin();
});


