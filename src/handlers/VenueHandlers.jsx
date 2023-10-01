/**
 * Function to handle the deletion of a venue by its ID.
 *
 * @async
 * @function
 * @param {string|number} id - The ID of the venue to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the deletion was successful, false otherwise.
 */
export const handleDelete = async (id) => {
  const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (response.ok) {
    return true;
  }
  return false;
};


/**
 * Function to handle the editing of a venue by its ID.
 *
 * @async
 * @function
 * @param {Event} e - The event object from the form submission.
 * @param {string|number} id - The ID of the venue to be edited.
 * @param {function} setVenue - Function to update the venue state.
 * @param {function} setIsEditing - Function to update the isEditing state.
 * @returns {Promise<void>} - A promise that resolves when the function has completed.
 */
export const handleEdit = async (e, id, setVenue, setIsEditing) => {
    e.preventDefault();  // Prevent default form submission behavior
  
    const updatedVenue = {};  // Object to store updated venue data
  
    // Collect updated venue data from the form, if present
    if (e.target.name.value) updatedVenue.name = e.target.name.value;
    if (e.target.description.value) updatedVenue.description = e.target.description.value;
    if (e.target.media.value) updatedVenue.media = e.target.media.value.split(',');
    if (e.target.price.value) updatedVenue.price = parseFloat(e.target.price.value);
    if (e.target.maxGuests.value) updatedVenue.maxGuests = parseInt(e.target.maxGuests.value);
  
    const location = {};  // Object to store updated location data
    if (e.target.address.value) location.address = e.target.address.value;
    if (e.target.city.value) location.city = e.target.city.value;
    if (e.target.country.value) location.country = e.target.country.value;
  
    // If any location data was updated, add it to the updatedVenue object
    if (Object.keys(location).length > 0) updatedVenue.location = location;
  
    // Send the updated venue data to the server
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedVenue),
    });
  
    // If the update was successful, update the venue state and reset the isEditing state
    if (response.ok) {
      const updatedVenue = await response.json();
      setVenue(updatedVenue);
      setIsEditing(false);
      window.location.reload();  // Reload the page to reflect the updated data
    } else {
      console.error("Failed to update venue");
    }
};
