// Import necessary dependencies and styles
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { load } from "../api/storage";
import { Label, ModalBackground, ModalContainer, StyledForm, StyledInput, TextArea } from "../styles/FormsStyle";
import { StyledTable } from "../styles/Calendar";
import { SubmitButton } from "../styles/ButtonStyle";
import { handleDelete, handleEdit } from "../handlers/VenueHandlers";
import { Container } from "../styles/Cards";

// Define the ManageVenue component
const ManageVenue = () => {
    const navigate = useNavigate();  // Hook for navigating programmatically
    const { id } = useParams();  // Hook for getting route parameters
    // Various state hooks
    const [isEditing, setIsEditing] = useState(false);
    const profile = load('profile');
    const [venue, setVenue] = useState(null);
    const [showBookings, setShowBookings] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const user = load("profile");

    // Function to close the delete success modal
    const closeModal = () => {
      setShowDeleteSuccessModal(false);
    };

    // Function to handle a successful delete operation
    const handleSuccessfulDelete = async () => {
      const success = await handleDelete(id);
      if (success) {
        setShowDeleteSuccessModal(true);
      }
    };

    // Effect hook to fetch venue data when component mounts or id changes
    useEffect(() => {
        fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
          .then(response => response.json())
          .then(parsed => setVenue(parsed));
    }, [id]);

    return (
        <div>
        {/* Modal for editing the venue */}
        {isEditing ? (
          <ModalBackground>
            <ModalContainer>
        <StyledForm onSubmit={(e) => handleEdit(e, id, setVenue, setIsEditing)}>
        {/* Form contents ... */}
        </StyledForm>
        </ModalContainer>
          </ModalBackground>
      ) : null}

      {/* Modal for successful deletion */}
      {showDeleteSuccessModal && (
        <ModalBackground>
        <ModalContainer>
          <Container>
          {/* Modal contents ... */}
          </Container>
        </ModalContainer>
      </ModalBackground>
      )}

      {/* Conditionally render delete/edit buttons and booking table based on user and venue ownership match */}
      {profile?.email === venue?.owner?.email ? (
      <>
       <SubmitButton onClick={handleSuccessfulDelete}>Delete Venue</SubmitButton>
        <SubmitButton onClick={() => setIsEditing(true)}>Edit Venue</SubmitButton>
        {/* Toggle button for showing/hiding bookings */}
        <SubmitButton onClick={() => setShowBookings(!showBookings)}>
          {showBookings ? "Hide Bookings" : "Show Bookings"}
        </SubmitButton>
        {/* Conditionally render bookings table */}
        {showBookings && (
          <StyledTable>
            {/* Table contents ... */}
          </StyledTable>
        )}
      </>
      ) : null}
      </div>
    );
};

// Export the ManageVenue component
export default ManageVenue;
