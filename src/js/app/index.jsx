import React from 'react';
import { Container } from 'reactstrap';

import Game from 'app/components/game';


export default function App() {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Game />
      </div>
    </Container>
  );
}
