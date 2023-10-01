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

/**
 * VenuePage Component
 *
 * This component renders a detailed view of a specific venue, fetched by its ID from an external API.
 * It showcases the venue information, management options (if applicable), and a booking form to allow users to make reservations.
 * The fetching of venue data is handled within a useEffect hook, which triggers the fetching process whenever the venue ID (obtained from the URL params) changes.
 * A loading indicator is displayed while the data is being fetched.
 *
 * @component
 * @example
 *
 * return (
 *   <VenuePage />
 * )
 */
const VenuePage = () => {
  const { id } = useParams();  // Fetching the venue ID from URL parameters
  const [venue, setVenue] = useState(null);  // State to hold the fetched venue data
  const [isLoading, setIsLoading] = useState(true);  // State to control the display of the loading indicator
  
  useEffect(() => {
    // Fetching venue data from the API using the fetched venue ID
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => response.json())
      .then(parsed => {
        setVenue(parsed);  // Storing the fetched venue data in the state
        setIsLoading(false);  // Hiding the loading indicator once data is loaded
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);  // Hiding the loading indicator on error too
      });
  }, 
  [id]);  // Effect dependency on venue ID

  return (
    <Layout>
      <PageContainer>
        <Container>
        {isLoading ? (
            <Loading />  // Showing the loading indicator while data is being fetched
          ) : (
          <>  // Fragment to group the following components
          <VenueInfo venue={venue} />  // Displaying venue information

          <ManageVenue venue={venue}></ManageVenue>  // Displaying venue management options

          <BookingForm venue={venue}></BookingForm>  // Displaying the booking form
          </>
          )}
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
