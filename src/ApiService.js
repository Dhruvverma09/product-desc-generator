/**
 * ApiService.js
 * Handles all communication between the React frontend and the Express backend.
 * The backend handles Groq API calls and MongoDB storage.
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Generate a product description via the server and save it to MongoDB.
 * @param {{ productName, ingredients, weight, features, tone }} formData
 * @returns {{ _id, generatedDescription, wordCount, createdAt }}
 */
export async function generateAndSave(formData) {
  const response = await fetch(`${API_URL}/api/descriptions/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Server error while generating description');
  }

  return response.json();
}

/**
 * Fetch the last 10 generated descriptions from MongoDB.
 * @returns {Array<{ _id, productName, tone, wordCount, createdAt, generatedDescription }>}
 */
export async function getHistory() {
  const response = await fetch(`${API_URL}/api/descriptions/history`);

  if (!response.ok) {
    throw new Error('Could not fetch history from server');
  }

  return response.json();
}

/**
 * Delete a saved description by its MongoDB _id.
 * @param {string} id - MongoDB ObjectId string
 */
export async function deleteDescription(id) {
  const response = await fetch(`${API_URL}/api/descriptions/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not delete description');
  }

  return response.json();
}
