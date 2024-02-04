
const { Client } = require('pg');
const client = new Client({ user: 'postgres', host: 'localhost', database: 'rent_management2', password: '198728', port: '5434', });
client.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) .catch((err) => { console.error('Error connecting to the database:', err); });
// PostgreSQL connection configuration
// const dbConfig = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'rent_managent',
//     password: '198728',
//     port: 5434,
// };
//check connection to db 
connection.connect(function(err) {

    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});
// Function to initialize the PostgreSQL connection pool
async function initializePool() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

// Function to add a new tenant by the admin
async function addTenant(username, password) {
    try {
        // Ensure the client is connected before using it
        await initializePool();

        const result = await client.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
            [username, password, 'tenant']
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error adding tenant:', error);
        throw error;
    } finally {
        // Disconnect from the database after the query
        await client.end();
        console.log('Disconnected from the database');
    }
}

// Function to fetch data from the database
async function fetchDataFromDB() {
    try {
        // Ensure the client is connected before using it
        await initializePool();

        const result = await client.query(
            'SELECT * FROM users WHERE role = $1',
            ['tenant']
        );

        return result.rows;
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        throw error;
    } finally {
        // Disconnect from the database after the query
        await client.end();
        console.log('Disconnected from the database');
    }
}

// JavaScript function to handle form submission for adding a new tenant
async function createNewTenant() {
    try {
        // Get values from the form inputs
        const newTenantUsername = document.getElementById('newTenantUsername').value;
        const newTenantPassword = document.getElementById('newTenantPassword').value;

        // Validate the inputs if needed
        if (!newTenantUsername.trim() || !newTenantPassword.trim()) {
            alert('Please enter both username and password for the new tenant.');
            return;
        }

        // Call the addTenant function to insert data into the database
        const newTenant = await addTenant(newTenantUsername, newTenantPassword);
        console.log('New tenant added:', newTenant);

        // Optionally, you can perform additional actions after adding the tenant

        // Reset the form after submission
        document.getElementById('tenantForm').reset();
    } catch (error) {
        console.error('Error creating new tenant:', error);
        // Handle the error as needed, e.g., display an alert
        alert('Error creating new tenant. Please try again.');
    }
}

// JavaScript function to handle fetching and displaying data in the HTML
async function fetchAndDisplayData() {
    try {
        // Call the fetchDataFromDB function to fetch data from the database
        const tenantData = await fetchDataFromDB();

        // Display the fetched data in the HTML (Example: append to a list)
        const dataList = document.getElementById('tenantDataList');
        dataList.innerHTML = ''; // Clear previous data

        tenantData.forEach((tenant) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Username: ${tenant.username}, Password: ${tenant.password}`;
            dataList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
        // Handle the error as needed, e.g., display an alert
        alert('Error fetching and displaying data. Please try again.');
    }
}
