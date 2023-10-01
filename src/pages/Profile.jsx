import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { load } from '../api/storage';
import Layout from '../components/Layout';
import VenueCreationForm from '../components/CreateVenue';
import { LeftColumn, PageContainer, RightColumn } from '../styles/ProfileStyle';
import { DisplayVenues } from '../components/DisplayVenues';
import ProfileInfo from '../components/ProfileInfo';
import BookedVenues from '../components/BookedVenues';
import Modal from '../components/Modal';
import { Container } from '../styles/Cards';
import { SubmitButton } from '../styles/ButtonStyle';
import Loading from '../components/LoadingIndicator';

/**
 * ProfilePage Component
 *
 * A component that renders a profile page of a user, which displays the user's
 * profile information, venues they manage (if they are a venue manager),
 * and the venues they've booked. The page also provides functionality
 * for a venue manager to create a new venue.
 *
 * The profile information is loaded from the local storage using a custom `load` function.
 *
 * @component
 * @example
 *
 * return (
 *   <ProfilePage />
 * )
 */
const ProfilePage = () => {
  const { name } = useParams();  // The username obtained from the URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);  // User profile state
  const [showUpdateAvatarPage, setShowUpdateAvatarPage] = useState(false);  // State to toggle avatar update UI
  const [showVenueCreationForm, setShowVenueCreationForm] = useState(false);  // State to toggle venue creation form
  const [showSuccessModal, setShowSuccessModal] = useState(false);  // State to toggle the success modal after venue creation

  /**
   * Handles the submission of the venue creation form by logging the created venue
   * and displaying a success modal.
   *
   * @param {Object} createdVenue - The created venue object.
   */
  const onSubmitVenue = (createdVenue) => {
    setShowSuccessModal(true);
    console.log("Created Venue:", createdVenue);
  };

  // Load profile information from local storage when component mounts
  useEffect(() => {
    const user = load('profile');
    setProfile(user);
  }, []);

  // Display a loading indicator while profile information is being loaded
  if (!profile) {
    return <Loading />;
  }
  
  return (
    <Layout>
      <PageContainer>
        <LeftColumn>
          <Container>
            <ProfileInfo 
              profile={profile} 
              setShowUpdateAvatarPage={setShowUpdateAvatarPage} 
              showUpdateAvatarPage={showUpdateAvatarPage}
            />
            
            {/* Display venue creation UI for venue managers */}
            {profile.venueManager && (
              <>
                {!showVenueCreationForm && (
                  <SubmitButton onClick={() => setShowVenueCreationForm(true)}>
                    Click here to create a new venue
                  </SubmitButton>
                )}
   
                <Modal show={showVenueCreationForm} onClose={() => setShowVenueCreationForm(false)}>
                  <VenueCreationForm 
                    setShowVenueCreationForm={setShowVenueCreationForm}
                    onSubmitVenue={onSubmitVenue}/>
                </Modal>
              </>
            )}  
          </Container>
        </LeftColumn>
        
        <RightColumn>
          <Modal show={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
            <Container>
              <h3>Creation Success</h3>
              <SubmitButton onClick={() => { setShowSuccessModal(false); navigate('/'); }}>
                Browse venues
              </SubmitButton>
              <SubmitButton onClick={() => { setShowSuccessModal(false); window.location.reload() }}>
                See Your Managed Venues
              </SubmitButton>
            </Container>
          </Modal>

          {/* Display managed venues and booked venues */}
          {profile.venueManager && <DisplayVenues name={name} />}
          <BookedVenues></BookedVenues>
        </RightColumn>
      </PageContainer>
    </Layout>
  );
};

export default ProfilePage;
