// your-script.js
document.getElementById('signIn').addEventListener('Onclick', () => {
    // Replace 'tenant-file.html' with the actual HTML file name
    const htmlFileName = 'Tenant-index.html';

    // Redirect the user to the HTML file within the 'tenant' folder
    window.location.href = `tenant/${htmlFileName}`;
});
