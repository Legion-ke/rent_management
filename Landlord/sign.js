function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "signin.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    document.getElementById("signInSuccess").innerText = response.message;
                    // Redirect to dashboard or any other page upon successful sign-in
                    window.location.href = "\Dashboard\Dashboard.html";
                } else {
                    document.getElementById("signInError").innerText = response.message;
                }
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };
    xhr.send("email=" + email + "&password=" + password);
}
