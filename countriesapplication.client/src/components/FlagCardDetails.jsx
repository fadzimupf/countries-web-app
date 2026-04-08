import { useEffect, useState } from "react";
import { Card, Image, Message, Icon } from "semantic-ui-react";
import { getCountryByName } from "../api/countryApi";
import LoadingComponent from "./LoadingComponent.jsx";
import "./FlagCardDetails.css";

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
  if (error)
    return (
      <Message negative icon>
        <Icon name="warning circle" />
        <Message.Content>
          <Message.Header>{error}</Message.Header>
        </Message.Content>
      </Message>
    );

  const hasPopulation =
    countryDetails.population != null && countryDetails.population !== 0;
  const hasCapital =
    countryDetails.capital != null && countryDetails.capital !== "";

  return (
    <Card onClick={onClose} className="flag-card-details">
      <Card.Content>
        <Card.Header className="flag-card-details-header">
          <Image src={country.flag} className="flag-card-details-flag" />
          {countryDetails.name}
        </Card.Header>

        {hasPopulation && (
          <Card.Description>
            <strong>Population:</strong>{" "}
            {countryDetails.population.toLocaleString()}
          </Card.Description>
        )}

        {hasCapital && (
          <Card.Description>
            <strong>Capital:</strong> {countryDetails.capital}
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
}

export default FlagCardDetails;
