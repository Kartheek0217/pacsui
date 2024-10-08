// /src/main/resources/static/scripts/utils/util.js

/**
 * Populates a dropdown element with data from a GET request
 * @param {string} url - The endpoint to fetch the data from
 * @param {string} dropdownId - The ID of the dropdown element
 * @param {string} valueField - The key in the response object to use for option values
 * @param {string} textField - The key in the response object to use for option text
 */
// /src/main/resources/static/scripts/utils/util.js

export async function populateDropdown(url, dropdownId, valueField, textField) {
  const dropdown = document.getElementById(dropdownId);

  if (dropdown) {
    dropdown.innerHTML = '<option value="">Loading...</option>'; // Loading message
    try {
      const data = await makeRequest("GET", url);
      console.log("Data fetched:", data); // Log the data to verify it

      dropdown.innerHTML = ""; // Clear loading message once data arrives
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valueField];
        option.textContent = item[textField];
        dropdown.appendChild(option);
      });
    } catch (error) {
      console.error(`Failed to populate dropdown ${dropdownId}:`, error);
      dropdown.innerHTML = `<option value="">Error loading data</option>`;
    }
  } else {
    console.error(`Dropdown with ID "${dropdownId}" not found.`);
  }
}

/**
 * Makes a generic HTTP request
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE)
 * @param {string} url - The endpoint URL
 * @param {Object} data - Data to send (for POST/PUT requests)
 * @returns {Promise<any>} - The response from the server
 */
export async function makeRequest(method, url, data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
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
