import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { PageContainer } from "../styles/Venue";
import "react-datepicker/dist/react-datepicker.css";
import VenueInfo from "../components/VenueInfo";
import ManageVenue from "../components/ManageVenue";
import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  
  
  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => response.json())
      .then(parsed => setVenue(parsed));
  }, 
  [id]);


  return (
    <Layout>
      <PageContainer>

      <VenueInfo venue={venue} />

      <ManageVenue venue={venue}></ManageVenue>

      <BookingForm venue={venue}></BookingForm>

        
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
