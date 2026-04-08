import { useEffect, useState } from "react";
import { getCountries } from "../api/countryApi";
import { Message, Icon, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "./LoadingComponent.jsx";
import CountryGrid from "./CountryGrid.jsx";

function CountryIndexContainer() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getCountries();
        setCountries(response.data);
      } catch (err) {
        setError("Failed to load countries.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Segment style={{ marginTop: "2rem" }}>
      <Header as="h1" textAlign="center" dividing>
        🌍 Know Your Flags
        <Header.Subheader>
          Click on a flag to explore country details.
        </Header.Subheader>
      </Header>

      {loading && <LoadingComponent text="countries" />}

      {error && (
        <Message negative icon>
          <Icon name="warning circle" />
          <Message.Content>
            <Message.Header>{error}</Message.Header>
          </Message.Content>
        </Message>
      )}

      {!loading && !error && <CountryGrid countries={countries} />}
    </Segment>
  );
}

export default CountryIndexContainer;
