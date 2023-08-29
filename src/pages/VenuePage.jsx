import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { load } from "../api/storage";
import { Card, FormGroup, Input, Label, SubmitButton, TextArea } from "../styles/Forms";
import { CustomCalendar, Feature, FeatureList, GuestsInput, GuestsLabel, Image, ImageContainer, InfoRow, Location, PageContainer, StyledTable, Title, VenueInfoContainer } from "../styles/Venue";

import "react-datepicker/dist/react-datepicker.css";



const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const profile = load('profile');
  const [selectingStartDate, setSelectingStartDate] = useState(true); // Determine what type of date is being selected
  const [numGuests, setNumGuests] = useState(1);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true&_customer=true`)
      .then(response => response.json())
      .then(parsed => setVenue(parsed));
  }, 
  [id]);


  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true&_customer=true`)
      .then(response => response.json())
      .then(parsed => {
        console.log('Parsed data:', parsed);  // Log here
        setVenue(parsed);
        
        // If bookings are public, populate booked dates here
        if (parsed.bookings) {
          const allBookedDates = [];
          parsed.bookings.forEach(booking => {
            let currentDate = new Date(booking.dateFrom);
            const endDate = new Date(booking.dateTo);
            while (currentDate <= endDate) {
              allBookedDates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
          });
          setBookedDates(allBookedDates);
        }
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
    if (startDate === null || endDate === null || numGuests === null) {
      alert("Please fill in all the details before booking.");
      return;
    }

    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: numGuests,
      venueId: venue.id
    };

    
  const response = await fetch('https://api.noroff.dev/api/v1/holidaze/bookings?_owner=true&_bookings=true&_customer=true', {
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

  const isBooked = date => {
    const formattedDate = new Date(date);
    return bookedDates.some(bookedDate =>
      formattedDate.toDateString() === bookedDate.toDateString()
    );
  };

  const handleCalendarClick = (date) => {
    if (selectingStartDate) {
      if (!isBooked(date)) {
        setStartDate(date);
        setSelectingStartDate(false); // Switch to end date selection
      } else {
        alert('This start date is already booked.');
      }
    } else {
      if (date > startDate) {
        setEndDate(date);
        setSelectingStartDate(true); // Switch back to start date selection
      } else {
        alert('End date must be after start date.');
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return;
    if (isBooked(date)) return "booked"; // Class name for booked dates
    if (date.toDateString() === startDate?.toDateString()) return "selected-start"; // Class name for start date
    if (date.toDateString() === endDate?.toDateString()) return "selected-end"; // Class name for end date
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
          
          {/* New Button to Show/Hide Bookings */}
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
        ) : null}
        
        
        {!localStorage.getItem("token") ? (
          <>

          <CustomCalendar
          onClickDay={(value) => handleCalendarClick(value)}
          tileDisabled={({ date, view }) =>
            view === "month" && isBooked(date)
          }
          tileClassName={tileClassName}
          />
          
          <SubmitButton onClick={() => window.location.replace("/login")}>
            Want to book? Login
          </SubmitButton></>
        ) : null}
        

        {localStorage.getItem("token") ? (
  <>
    {profile?.email !== venue?.owner?.email ? (
      <>
        <h3>Book this Venue</h3>
        <CustomCalendar
          onClickDay={(value) => handleCalendarClick(value)}
          tileDisabled={({ date, view }) =>
            view === "month" && isBooked(date)
          }
          tileClassName={tileClassName}
        />
        <GuestsLabel>
          Number of Guests: 
          <GuestsInput 
            type="number" 
            value={numGuests} 
            onChange={(e) => setNumGuests(e.target.value)} 
            min="1" max={venue?.maxGuests}
          />
        </GuestsLabel>
        
        <SubmitButton onClick={handleBooking}>Confirm Booking</SubmitButton>
        
        {startDate && <div>Start Date: {startDate.toDateString()}</div>}
        {endDate && <div>End Date: {endDate.toDateString()}</div>}
      </>
    ) : (
      <div></div>
    )}
  </>
) : null}







        </VenueInfoContainer>
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
