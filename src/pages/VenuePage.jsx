import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const VenuePage = () => {

    const {id} = useParams(); 
    const [venue, setVenue] = useState(); 

    useEffect(() => {
        fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`)
        .then((response) => response.json())  // Corrected syntax
        .then((parsed) => setVenue(parsed));  // Corrected syntax
    }, []);
  
    return (
      <Layout>
        <h1>Venue page</h1>
        <p>{venue?.title}</p>

      </Layout>
    );
  };
  
export default VenuePage;