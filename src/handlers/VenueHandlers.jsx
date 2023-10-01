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
export const handleEdit = async (e, id, setVenue, setIsEditing) => {
  e.preventDefault();

  const updatedVenue = {};

  if (e.target.name.value) updatedVenue.name = e.target.name.value;
  if (e.target.description.value) updatedVenue.description = e.target.description.value;
  if (e.target.media.value) updatedVenue.media = e.target.media.value.split(',');
  if (e.target.price.value) updatedVenue.price = parseFloat(e.target.price.value);
  if (e.target.maxGuests.value) updatedVenue.maxGuests = parseInt(e.target.maxGuests.value);

  const location = {};
  if (e.target.address.value) location.address = e.target.address.value;
  if (e.target.city.value) location.city = e.target.city.value;
  if (e.target.country.value) location.country = e.target.country.value;

  if (Object.keys(location).length > 0) updatedVenue.location = location;

  try {
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedVenue),
    });

    if (response.ok) {
      const updatedVenueData = await response.json();
      setVenue(updatedVenueData);
      setIsEditing(false);
      window.location.reload();
    } else {
      console.error("Failed to update venue");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
