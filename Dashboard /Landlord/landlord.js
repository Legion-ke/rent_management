const { Client } = require('pg');

// PostgreSQL connection configuration
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'rent_managent',
    password: '198728',
    port: 5432,
};

// Create a single PostgreSQL client instance (connection pool)
const client = new Client(dbConfig);

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
        const result = await client.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
            [username, password, 'tenant']
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding tenant:', error);
        throw error;
    }
}

// Function to handle the form submission
async function createNewTenant() {
    console.log('Form submission initiated');

    const tenantUsername = document.getElementById('tenantUsername').value;
    const tenantPassword = document.getElementById('tenantPassword').value;

    console.log('Tenant username:', tenantUsername);
    console.log('Tenant password:', tenantPassword);

    try {
        // Ensure the client is connected before using it
        await initializePool();

        // Call the addTenant function
        const newTenant = await addTenant(tenantUsername, tenantPassword);
        console.log('New tenant added:', newTenant);
        // You can perform additional actions here if needed
    } catch (error) {
        console.error('Error creating new tenant:', error);
    } finally {
        // Do not close the connection here to reuse the connection pool
    }
}

// Export addTenant function for external use
module.exports = {
    addTenant
};
