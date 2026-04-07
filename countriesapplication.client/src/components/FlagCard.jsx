import { Card, Image } from "semantic-ui-react";

function FlagCard({ country, onOpen }) {
  return (
    <Card fluid onClick={onOpen}>
      <Image
        src={country.flag}
        alt={`Flag of ${country.name}`}
        style={{ width: "100%", height: "auto" }}
      />
    </Card>
  );
}

export default FlagCard;
