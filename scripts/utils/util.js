// /src/main/resources/static/scripts/utils/util.js

// Simplified utility functions as before...
export async function populateDropdown(url, dropdownId, valueField, textField) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.innerHTML = '';  // Clear any existing options
        try {
            const data = await makeRequest('GET', url);
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item[valueField];
                option.textContent = item[textField];
                dropdown.appendChild(option);
            });
        } catch (error) {
            console.error(`Failed to populate dropdown ${dropdownId}:`, error);
        }
    }
}

export async function makeRequest(method, url, data = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
}
