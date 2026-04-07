import { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";
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
    <Card
      onClick={onClose}
      style={{
        height: "200px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      className="flag-card-details"
    >
      <Card.Content>
        <Card.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Image
            src={country.flag}
            style={{ width: "30px", height: "20px", objectFit: "cover" }}
          />
          {countryDetails.name}
        </Card.Header>
        <Card.Description>
          <strong>Population:</strong>{" "}
          {countryDetails.population.toLocaleString()}
        </Card.Description>
        <Card.Description>
          <strong>Capital:</strong> {countryDetails.capital}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default FlagCardDetails;
