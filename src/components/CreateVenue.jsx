// Importing necessary libraries and styled components
import React, { useState } from 'react';
import { BASE_URL } from '../api/Constants';
import { CheckboxGroup, CheckboxLabel, Label, StyledForm, StyledInput, TextArea } from '../styles/FormsStyle';
import { SecondaryButton, SubmitButton } from '../styles/ButtonStyle';

/**
 * VenueCreationForm Component.
 * 
 * @param {Object} props - The props object.
 * @param {Function} props.setShowVenueCreationForm - Function to toggle the display of the venue creation form.
 * @param {Function} props.onSubmitVenue - Function to handle the submission of the venue creation form.
 */
const VenueCreationForm = ({ setShowVenueCreationForm, onSubmitVenue }) => {
    // Initial state for a new venue.
    const initialVenueState = {
      name: '',
      description: '',
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: '',
        city: '',
        country: '',
      },
    };

    // State hooks for venue details and success modal visibility.
    const [newVenue, setNewVenue] = useState(initialVenueState);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    /**
     * Handles input changes for the venue form fields.
     *
     * @param {string} field - The field name.
     * @param {any} value - The new value of the field.
     */
    const handleVenueInputChange = (field, value) => {
        if (field === 'price' || field === 'maxGuests') {
          value = isNaN(value) ? 0 : value; // Check for NaN and set to 0 if it is NaN
        }
        setNewVenue((prevVenue) => ({
          ...prevVenue,
          [field]: value,
        }));
    };

    /**
     * Handles the cancel action to hide the venue creation form.
     */
    const handleCancel = () => {
      setShowVenueCreationForm(false);  // Hide the form
    };
  
    /**
     * Handles the change event for checkboxes.
     *
     * @param {string} field - The checkbox field name.
     */
    const handleCheckboxChange = (field) => {
      setNewVenue((prevVenue) => ({
        ...prevVenue,
        meta: {
          ...prevVenue.meta,
          [field]: !prevVenue.meta[field],
        },
      }));
    };
  
    /**
     * Handles the submission of the venue creation form.
     *
     * @param {Object} event - The form submit event.
     */
    const handleSubmitVenue = async (event) => {
      event.preventDefault();
      setShowSuccessModal(true);
  
      try {
        const createURL = `${BASE_URL}/venues`;
        const token = localStorage.getItem("token");
    
        const response = await fetch(createURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newVenue),
        });
        
        if (response.ok) {
          const createdVenue = await response.json();
          onSubmitVenue(createdVenue);
          setNewVenue(initialVenueState);
          setShowVenueCreationForm(false);
    
          console.log("About to set showSuccessModal to true");  
          setShowSuccessModal(true);  
          console.log("Set showSuccessModal to true");  
        } else {
          console.error('Failed to create venue');
        }
      } catch (error) {
        console.error('Error creating venue:', error);
      }
    };

    return (
    <>
    <StyledForm onSubmit={handleSubmitVenue}>

      <h2>Create a New Venue</h2>
 
        <Label>Name:</Label>
        <StyledInput
          type="text"
          value={newVenue.name}
          onChange={(e) => handleVenueInputChange('name', e.target.value)}
          required
        />

        <Label>Description:</Label>
        <TextArea
          value={newVenue.description}
          onChange={(e) => handleVenueInputChange('description', e.target.value)}
          required
        />
  
        <Label>Media (comma-separated URLs):</Label>
        <StyledInput
          type="text"
          value={newVenue.media.join(', ')} // Convert array to comma-separated string
          onChange={(e) => handleVenueInputChange('media', e.target.value.split(', ').filter(url => url.trim() !== ''))}
        />

        <Label>Price:</Label>
        <StyledInput
          type="number"
          value={newVenue.price}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            handleVenueInputChange('price', isNaN(val) ? 0 : val);
          }}
          required
        />

        <Label>Max Guests:</Label>
        <StyledInput
          type="number"
          value={newVenue.maxGuests}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            handleVenueInputChange('maxGuests', isNaN(val) ? 0 : val);
          }}
          required
        />

        <Label>Address:</Label>
        <StyledInput
          type="text"
          value={newVenue.location.address}
          onChange={(e) => handleVenueInputChange('location', { ...newVenue.location, address: e.target.value })}
        />

        <Label>City:</Label>
        <StyledInput
          type="text"
          value={newVenue.location.city}
          onChange={(e) => handleVenueInputChange('location', { ...newVenue.location, city: e.target.value })}
        />

        <Label>Country:</Label>
        <StyledInput
          type="text"
          value={newVenue.location.country}
          onChange={(e) => handleVenueInputChange('location', { ...newVenue.location, country: e.target.value })}
        />

        <CheckboxGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={newVenue.meta.wifi}
              onChange={() => handleCheckboxChange('wifi')}
            />
            WiFi
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={newVenue.meta.parking}
              onChange={() => handleCheckboxChange('parking')}
            />
            Parking
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={newVenue.meta.breakfast}
              onChange={() => handleCheckboxChange('breakfast')}
            />
            Breakfast
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={newVenue.meta.pets}
              onChange={() => handleCheckboxChange('pets')}
            />
            Pets
          </CheckboxLabel>

        </CheckboxGroup>

        <SubmitButton type="submit">Create Venue</SubmitButton>
        <SecondaryButton type="button" onClick={handleCancel}>Cancel</SecondaryButton>
    
    </StyledForm> 
    </>
  );
};

// Exporting the VenueCreationForm component to be used in other parts of the application.
export default VenueCreationForm;

