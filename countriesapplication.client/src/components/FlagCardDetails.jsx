import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { getCountryByName } from "../api/countryApi";
import LoadingComponent from "./LoadingComponent.jsx";

function FlagCardDetails({ country, onClose }) {
  const [countryDetails, setCountryDetails] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getCountryByName(country.name);
        setCountryDetails(response.data);
      } catch (err) {
        setError("Failed to load country.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [country.name]);

  if (loading) return <LoadingComponent text="country" />;
  if (error) return <p>{error}</p>;

  return (
    <Card fluid onClick={onClose}>
      <Card.Content>
        <Card.Header>{countryDetails.name}</Card.Header>
        <Card.Description>
          Population : {countryDetails.population}
        </Card.Description>
        <Card.Description>Capital : {countryDetails.capital}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default FlagCardDetails;
