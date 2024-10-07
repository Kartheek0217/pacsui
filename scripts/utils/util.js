// /src/main/resources/static/scripts/utils/util.js

/**
 * Displays a loader inside a given element
 * @param {string} elementId - The ID of the element to show the loader in
 */
function showLoader(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '<div class="loader"></div>';
  }
}

/**
 * Hides the loader in the given element
 * @param {string} elementId - The ID of the element to hide the loader from
 */
function hideLoader(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '';
  }
}

/**
 * Makes a generic HTTP request
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE)
 * @param {string} url - The endpoint URL
 * @param {Object} data - Data to send (for POST/PUT requests)
 * @param {string} elementId - The ID of the element where the loader should be displayed
 * @returns {Promise<any>} - The response from the server
 */
async function makeRequest(method, url, data = null, elementId = null) {
  // Show loader while the request is being made
  if (elementId) {
    showLoader(elementId);
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // Hide loader after getting the response
    if (elementId) {
      hideLoader(elementId);
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    if (elementId) {
      document.getElementById(
        elementId
      ).innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
    throw error; // Re-throw the error for further handling
  }
}

/**
 * Populates a dropdown element with data from a GET request
 * @param {string} url - The endpoint to fetch the data from
 * @param {string} dropdownId - The ID of the dropdown element
 * @param {string} valueField - The key in the response object to use for option values
 * @param {string} textField - The key in the response object to use for option text
 */
async function populateDropdown(url, dropdownId, valueField, textField) {
  const dropdown = document.getElementById(dropdownId);

  if (dropdown) {
    dropdown.innerHTML = ''; // Clear any existing options
    try {
      const data = await makeRequest('GET', url, null, dropdownId);

      data.forEach((item) => {
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

/**
 * Handles button click and makes an HTTP request
 * @param {string} buttonId - The ID of the button to add the event listener to
 * @param {string} url - The URL to make the request to
 * @param {string} method - The HTTP method (GET, POST, etc.)
 * @param {string} resultElementId - The element to show the loader and result in
 * @param {Object} data - Optional data to send with the request
 */
function handleButtonClick(
  buttonId,
  url,
  method,
  resultElementId,
  data = null
) {
  const button = document.getElementById(buttonId);

  if (button) {
    button.addEventListener('click', async () => {
      try {
        const result = await makeRequest(method, url, data, resultElementId);
        document.getElementById(
          resultElementId
        ).innerHTML = `<p>Success: ${JSON.stringify(result)}</p>`;
      } catch (error) {
        console.error('Button request failed:', error);
      }
    });
  }
}

/**
 * Updates a form field from a PUT request when the form is submitted
 * @param {string} formId - The ID of the form
 * @param {string} url - The URL for the PUT request
 * @param {string} resultElementId - The ID where the loader and result should appear
 */
function handleFormSubmit(formId, url, resultElementId) {
  const form = document.getElementById(formId);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const result = await makeRequest('PUT', url, data, resultElementId);
        document.getElementById(
          resultElementId
        ).innerHTML = `<p>Form updated successfully: ${JSON.stringify(
          result
        )}</p>`;
      } catch (error) {
        console.error('Form submit failed:', error);
      }
    });
  }
}

// Export the utility functions
export {
  makeRequest,
  populateDropdown,
  handleButtonClick,
  handleFormSubmit,
  showLoader,
  hideLoader,
};
