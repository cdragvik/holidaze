export const BASE_URL = "https://nf-api.onrender.com/api/v1/holidaze";

export async function getBookingsByProfile(name) {
    const url = `${BASE_URL}/profiles/${name}/bookings`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
  
export async function getVenuesByProfile(name) {
    const url = `${BASE_URL}/profiles/${name}/venues`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}