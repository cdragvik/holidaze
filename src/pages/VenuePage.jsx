import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { PageContainer } from "../styles/VenuePageStyle";
import "react-datepicker/dist/react-datepicker.css";
import VenueInfo from "../components/VenueInfo";
import ManageVenue from "../components/ManageVenue";
import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";
import { Container } from "../styles/Cards";
import Loading from "../components/LoadingIndicator";

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => response.json())
      .then(parsed => {
        setVenue(parsed);
        setIsLoading(false);  // Set loading to false once data is loaded
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);  // Set loading to false on error too
      });
  }, 
  [id]);


  return (
    <Layout>
      <PageContainer>
        <Container>
        {isLoading ? (
            <Loading />  // Show loading spinner if isLoading is true
          ) : (<>
          <VenueInfo venue={venue} />

          <ManageVenue venue={venue}></ManageVenue>

          <BookingForm venue={venue}></BookingForm></>
          )}
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
