const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'yourdatabase',
    password: 'yourpassword',
    port: 5432,
});

function createNewTenant() {
    const newTenantUsername = document.getElementById('newTenantUsername').value;
    const newTenantPassword = document.getElementById('newTenantPassword').value;

    if (!newTenantUsername.trim() || !newTenantPassword.trim()) {
        alert('Please enter both username and password for the new tenant.');
        return;
    }

    // Insert the new tenant into the database
    pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
        [newTenantUsername, newTenantPassword, 'tenant'],
        (error, results) => {
            if (error) {
                console.error('Error creating new tenant:', error);
                alert('Error creating new tenant. Please try again.');
            } else {
                alert('New tenant created successfully!');
            }
        }
    );
}

function generateTenantReport() {
    // Query the database to get tenants who have paid
    pool.query(
        'SELECT * FROM users WHERE role = $1',
        ['tenant'],
        (error, results) => {
            if (error) {
                console.error('Error generating tenant report:', error);
                alert('Error generating tenant report. Please try again.');
            } else {
                displayTenantReport(results.rows);
            }
        }
    );
}

function displayTenantReport(tenants) {
    const tenantTable = document.getElementById('tenantTable');
    tenantTable.innerHTML = ''; // Clear existing content

    // Create table header
    const headerRow = tenantTable.insertRow(0);
    const headers = ['Username', 'Role'];
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.innerHTML = header;
        headerRow.appendChild(th);
    });

    // Populate the table with tenant data
    tenants.forEach((tenant, index) => {
        const row = tenantTable.insertRow(index + 1);
        const cells = [tenant.username, tenant.role];
        cells.forEach((cell, cellIndex) => {
            const td = row.insertCell(cellIndex);
            td.innerHTML = cell;
        });
    });
}

function signOut() {
    window.location.href = '../Dashboard-login/signin.html';
}

