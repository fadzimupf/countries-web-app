import { Card, Image } from "semantic-ui-react";
import './FlagCard.css'

function FlagCard({ country, onOpen }) {
  return (
    <Card  onClick={onOpen}>
      <Image
        src={country.flag}
        alt={`Flag of ${country.name}`}
        style={{ height: "200px" }}
      />
    </Card>
  );
}

export default FlagCard;
