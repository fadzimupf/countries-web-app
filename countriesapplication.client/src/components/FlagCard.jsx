import { Card, Image } from "semantic-ui-react";
import "./FlagCard.css";

function FlagCard({ country, onOpen }) {
  return (
    <Card onClick={onOpen} className="flag-card">
     <Image
        src={country.flag}
        alt={`Flag of ${country.name}`}
        className="flag-card-image"
      />
    </Card>
  );
}

export default FlagCard;
