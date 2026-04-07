import { Grid, Container } from "semantic-ui-react";
import FlagCard from "./FlagCard";
import { useState } from "react";
import FlagCardDetails from "./FlagCardDetails";
import './CountryGrid.css'

function CountryGrid({ countries }) {
  const [activeCountry, setActiveCountry] = useState(null);

  return (
    <div className="grid-wrapper">
      <Grid columns={5} doubling stackable style={{ margin: 0 }}>
        {countries.map((country) => {
          const isDetailed = activeCountry === country.name;

          return (
            <Grid.Column key={country.name}>
              {isDetailed ? (
                <FlagCardDetails
                  country={country}
                  onClose={() => setActiveCountry(null)}
                />
              ) : (
                <FlagCard
                  country={country}
                  onOpen={() => setActiveCountry(country.name)}
                />
              )}
            </Grid.Column>
          );
        })}
      </Grid>
     </div>
  );
}

export default CountryGrid;