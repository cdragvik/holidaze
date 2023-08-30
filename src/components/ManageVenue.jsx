import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { load } from "../api/storage";
import { Card, FormGroup, Input, Label, SubmitButton, TextArea } from "../styles/Forms";
import { StyledTable } from "../styles/Venue";

const ManageVenue = () => {

    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const profile = load('profile');
    const [venue, setVenue] = useState(null);
    const [showBookings, setShowBookings] = useState(false);

    useEffect(() => {
        fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
          .then(response => response.json())
          .then(parsed => setVenue(parsed));
      }, 
      [id]);

    const handleDelete = async () => {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
    
        if (response.ok) window.location.replace("/");
    };
    
    const handleEdit = async (e) => {
        e.preventDefault();
        const updatedVenue = {
          name: e.target.name.value,
          description: e.target.description.value,
        };
    
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(updatedVenue),
        });
    
        if (response.ok) {
          const updatedVenue = await response.json();
          setVenue(updatedVenue);
          setIsEditing(false);
        }
      };
    

    return (

        <div>

        {isEditing ? (


        
        <form onSubmit={handleEdit}>
          <Card>
            <FormGroup>
              <Label>Name:</Label>
              <Input type="text" name="name" defaultValue={venue?.name} />
            </FormGroup>
            <FormGroup>
              <Label>Description:</Label>
              <TextArea type="text" name="description" defaultValue={venue?.description} />
          </FormGroup>
          <FormGroup>
              <Label>Images:</Label>
              <Input type="text" name="media" defaultValue={venue?.media}></Input>
            </FormGroup>
            <FormGroup>
              <Label>Price:</Label>
              <Input type="number" name="price" defaultValue={venue.price}></Input>
            </FormGroup>
            <FormGroup>
              <Label>Max Guests:</Label>
              <Input type="number" name="maxGuests" defaultValue={venue.maxGuests}></Input>
            </FormGroup>
            <FormGroup>
              <Label>Address:</Label>
              <Input type="text" name="address" defaultValue={venue.location.address}></Input>
            </FormGroup>
            <FormGroup>
              <Label>City:</Label>
              <Input type="text" name="city" defaultValue={venue.location.city}></Input>
            </FormGroup>
            <FormGroup>
              <Label>Country:</Label>
              <Input type="text" name="country" defaultValue={venue.location.country}></Input>
            </FormGroup>  
              <SubmitButton type="submit">Update Venue</SubmitButton>
              <SubmitButton type="button" onClick={() => setIsEditing(false)}>Cancel</SubmitButton>
        </Card>
        </form>
      ) : null}
    
      
    {profile?.email === venue?.owner?.email ? (
      <>
        <SubmitButton onClick={handleDelete}>Delete Venue</SubmitButton>
        <SubmitButton onClick={() => setIsEditing(true)}>Edit Venue</SubmitButton>
      
      
      <SubmitButton onClick={() => setShowBookings(!showBookings)}>
          {showBookings ? "Hide Bookings" : "Show Bookings"}
        </SubmitButton>
        
        {showBookings && (
          <StyledTable>
            <thead>
              <tr>
                <th>Number of Guests</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {venue?.bookings?.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td>{booking.guests}</td>
                    <td>{new Date(booking.dateFrom).toLocaleDateString()}</td>
                    <td>{new Date(booking.dateTo).toLocaleDateString()}</td>
                  </tr>
                  );
                })}
            </tbody>
          </StyledTable>
        )}
      </>
    ) : null}</div>


)};

export default ManageVenue;