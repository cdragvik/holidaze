import React from 'react';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { load } from "../api/storage";
import { Label, ModalBackground, ModalContainer, StyledForm, StyledInput, TextArea } from "../styles/FormsStyle";
import { StyledTable } from "../styles/Calendar";
import { SubmitButton } from "../styles/ButtonStyle";
import { handleDelete, handleEdit } from "../handlers/VenueHandlers";


const ManageVenue = () => {

    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const profile = load('profile');
    const [venue, setVenue] = useState(null);
    const [showBookings, setShowBookings] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const user = load("profile");

    const closeModal = () => {
      setShowDeleteSuccessModal(false);
    };
  
    const handleSuccessfulDelete = async () => {
      const success = await handleDelete(id); // Assume handleDelete now returns a boolean indicating success
      if (success) {
        setShowDeleteSuccessModal(true);
      }
    };

    useEffect(() => {
        fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
          .then(response => response.json())
          .then(parsed => setVenue(parsed));
      }, 
    [id]);

    return (
        <div>

        {isEditing ? (

          <ModalBackground>
            <ModalContainer>


        <StyledForm onSubmit={(e) => handleEdit(e, id, setVenue, setIsEditing)}>
          
          <h1>Edit Venue</h1>
   
              <Label>Name:</Label>
              <StyledInput type="text" name="name" defaultValue={venue?.name} />

              <Label>Description:</Label>
              <TextArea type="text" name="description" defaultValue={venue?.description} />
 
              <Label>Images:</Label>
              <StyledInput type="text" name="media" defaultValue={venue?.media}></StyledInput>
  
              <Label>Price:</Label>
              <StyledInput type="number" name="price" defaultValue={venue.price}></StyledInput>
   
              <Label>Max Guests:</Label>
              <StyledInput type="number" name="maxGuests" defaultValue={venue.maxGuests}></StyledInput>
   
              <Label>Address:</Label>
              <StyledInput type="text" name="address" defaultValue={venue.location.address}></StyledInput>
  
              <Label>City:</Label>
              <StyledInput type="text" name="city" defaultValue={venue.location.city}></StyledInput>

              <Label>Country:</Label>
              <StyledInput type="text" name="country" defaultValue={venue.location.country}></StyledInput>
      
              <SubmitButton type="submit">Update Venue</SubmitButton>
              <SubmitButton type="button" onClick={() => setIsEditing(false)}>Cancel</SubmitButton>
        </StyledForm>
        </ModalContainer>
          </ModalBackground>
        
      ) : null}

{showDeleteSuccessModal && (
        <ModalBackground>
          <ModalContainer>
            <h3>Venue Successfully Deleted</h3>
            <SubmitButton onClick={() => { closeModal(); window.location.replace('/'); }}>
              Browse More
            </SubmitButton>
            <SubmitButton onClick={closeModal}>
              <Link to={`/profile/${user.name}`}>See Your Managed Venues</Link>
            </SubmitButton>
          </ModalContainer>
        </ModalBackground>
      )}


      
      {profile?.email === venue?.owner?.email ? (
      <>
       <SubmitButton onClick={handleSuccessfulDelete}>Delete Venue</SubmitButton>
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
