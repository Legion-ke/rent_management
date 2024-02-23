document.addEventListener("DOMContentLoaded", function() {
    fetchTenantData();
});

function fetchTenantData() {
    fetch("fetch_data.php")
    .then(response => response.json())
    .then(data => {
        displayTenantData(data);
    });
}

function displayTenantData(data) {
    let tenantInfo = document.getElementById("tenantInfo");
    tenantInfo.innerHTML = "<table border='1'><tr><th>Tenant ID</th><th>Username</th><th>Email</th><th>House Number</th></tr>";
    
    data.forEach(tenant => {
        tenantInfo.innerHTML += `<tr><td>${tenant.tenant_id}</td><td>${tenant.username}</td><td>${tenant.email}</td><td>${tenant.house_no}</td></tr>`;
    });

    tenantInfo.innerHTML += "</table>";
}
