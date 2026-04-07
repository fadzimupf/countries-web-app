import { Grid } from "semantic-ui-react";
import FlagCard from "./FlagCard";
import { useState } from "react";
import FlagCardDetails from "./FlagCardDetails";

function CountryGrid({ countries }) {
  const [activeCountryId, setActiveCountryId] = useState(null);

  return (
    <Grid columns={8} doubling stackable>
      {countries.map((country) => {
        const isDetailed = activeCountryId === country.name;

        return (
          <Grid.Column key={country.name}>
            {isDetailed ? (
              <FlagCardDetails
                country={country}
                onClose={() => setActiveCountryId(null)}
              />
            ) : (
              <FlagCard
                country={country}
                onOpen={() => setActiveCountryId(country.name)}
              />
            )}
          </Grid.Column>
        );
      })}
    </Grid>
  );
}

export default CountryGrid;
