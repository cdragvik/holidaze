import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
import Loading from '../components/LoadingIndicator';

const ProfilePage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showUpdateAvatarPage, setShowUpdateAvatarPage] = useState(false);
  const [showVenueCreationForm, setShowVenueCreationForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  
  const onSubmitVenue = (createdVenue) => {
    setShowSuccessModal(true);
    console.log("Created Venue:", createdVenue);
  };

  useEffect(() => {
    const user = load('profile');
    setProfile(user);
  }, []);

  if (!profile) {
    return <Loading/>;
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

          {profile.venueManager && <DisplayVenues name={name} />}
          <BookedVenues></BookedVenues>
          
        </RightColumn>
      </PageContainer>
    </Layout>
  );
};

export default ProfilePage;
