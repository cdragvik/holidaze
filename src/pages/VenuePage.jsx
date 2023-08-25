import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { load } from "../api/storage";
import { Card, FormGroup, Input, Label, SubmitButton, TextArea } from "../styles/Forms";
import { Feature, FeatureList, Image, ImageContainer, InfoRow, Location, PageContainer, Title, VenueInfoContainer } from "../styles/Venue";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const profile = load('profile');

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true`)
      .then(response => response.json())
      .then(parsed => setVenue(parsed));
  }, 
  [id]);


  useEffect(() => {
    fetch('https://api.noroff.dev/api/v1/holidaze/bookings', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const allBookedDates = [];
      data.forEach(booking => {
        let currentDate = new Date(booking.dateFrom);
        const endDate = new Date(booking.dateTo);
        while (currentDate <= endDate) {
          allBookedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setBookedDates(allBookedDates);
    });
  }, [id]);

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


  const handleBooking = async () => {
    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: 1, // Or however you plan to handle guest numbers
      venueId: id
    };

    const response = await fetch('https://api.noroff.dev/api/v1/holidaze/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(bookingInfo),
    });

    if (response.ok) {
      alert('Booking successful');
    } else {
      alert('Booking failed');
    }
  };



  return (
    <Layout>
      <PageContainer>
        <Title>{venue?.name}</Title>
        <Location>{venue?.location?.city}, {venue?.location?.country}</Location>
        <VenueInfoContainer>
          <ImageContainer>
            <Image src={venue?.media?.[0]} alt={venue?.name} />
          </ImageContainer>

          <p>{venue?.description}</p>

          <InfoRow>
            <span>Price:</span> <span>${venue?.price} /night</span>
          </InfoRow>
          <InfoRow>
            <span>Max Guests:</span> <span>{venue?.maxGuests}</span>
          </InfoRow>
          <InfoRow>
            <span>Rating:</span> <span>{venue?.rating} ★</span>
          </InfoRow>

          <FeatureList>
            {venue?.meta?.wifi && <Feature>WiFi</Feature>}
            {venue?.meta?.parking && <Feature>Parking</Feature>}
            {venue?.meta?.breakfast && <Feature>Breakfast</Feature>}
            {venue?.meta?.pets && <Feature>Pets Allowed</Feature>}
          </FeatureList>

          {venue?.owner && (
            <div>
              <h3>Owner Information</h3>
              <p>Name: {venue.owner.name}</p>
              <p>Email: {venue.owner.email}</p>
            </div>
          )}
        
        
        <h3>Book this Venue</h3>
        <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  selectsStart
  startDate={startDate}
  endDate={endDate}
  minDate={new Date()}
  excludeDates={bookedDates}
/>
<DatePicker
  selected={endDate}
  onChange={(date) => setEndDate(date)}
  selectsEnd
  startDate={startDate}
  endDate={endDate}
  minDate={startDate}
  excludeDates={bookedDates}
/>

        <SubmitButton onClick={handleBooking}>Book Now</SubmitButton>   
        
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
          </>
        ) : !localStorage.getItem("token") ? (
          <SubmitButton onClick={() => window.location.replace("/login")}>
            Want to book? Login
          </SubmitButton>
        ) : null}
        

        </VenueInfoContainer>
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
