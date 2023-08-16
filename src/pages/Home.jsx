import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/VenueCard"; // Make sure to import the correct component name
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const ContentContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CardWrapper = styled(Link)`
  display: flex;
  justify-content: center;
`;

const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  display: block;
  margin: 40px auto;
`;

const Heading = styled.h1`
    text-align: center;
    font-size: 40px;
`


const Home = () => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);

  
  useEffect(() => {
    fetch("https://api.noroff.dev/api/v1/holidaze/venues")
      .then((response) => response.json())
      .then((data) => {
        setVenues(data);
        setFilteredVenues(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  useEffect(() => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered);
  }, [searchTerm, venues]);


  return (
    <Layout>

      <Heading>Your Perfect Getaway Awaits</Heading>

      <SearchBar
        type="text"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>


      <ContentContainer>
        {filteredVenues.map((venue) => (
          <CardWrapper key={venue.id} to={`/venues/${venue.id}`}>
            <Card
              imageSrc={venue.media[0]}
              city={venue.location.city}
              country={venue.location.country}
              title={venue.name}
              rating={venue.rating}
              price={venue.price}
              id={venue.id}
            />
          </CardWrapper>
        ))}
      </ContentContainer>

    </Layout>
  );
};

export default Home;
