import { Loader, Segment } from "semantic-ui-react";

function LoadingComponent({ text }) {
  return (
    <Segment basic textAlign="center" style={{ minHeight: 200 }}>
      <Loader active inline="centered" size="large">
        Loading {text}...
      </Loader>
    </Segment>
  );
}

export default LoadingComponent;
