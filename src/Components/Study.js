import React from "react";

import {
  Typography,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardActionArea,
  Collapse,
} from "@mui/material";

const Study = ({ flashcards }) => {

  const [unsureCards, setUnsureCards] = React.useState([]);

  const [shuffled, setShuffled] = React.useState(flashcards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value));

  const [index, setIndex] = React.useState(0);

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const know = () => {

    next();
  } 

  const unsure = () => {
    
    next();
  } 


  const next = () => {
    if (index < shuffled.length - 1) {
      setIndex(index + 1);
    } else {
      // setIndex(0);
      // setShuffled();
    }
  };

  return (
    <>
      <FlashCard key={shuffled[index][0]} card={shuffled[index]} />

      <ButtonGroup variant="outlined" aria-label="outlined button group" size="large">
        <Button onClick={unsure} color="warning">Unsure</Button>
        <Button onClick={previous}>Previous</Button>
        <Button onClick={know} color="success">Know</Button>
      </ButtonGroup>
    </>
  );
};

const FlashCard = (card) => {
  const [expanded, setExpanded] = React.useState(false);
  console.log(card.card);

  const side1 = card.card[0];
  const side2 = card.card[1];

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea onClick={() => setExpanded(!expanded)}>
        <CardContent>
          <Typography variant="h5" component="div">
            {side1}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography variant="h5" component="div" sx={{ m: 2 }}>
          {side2}
        </Typography>
      </Collapse>
    </Card>
  );
};

export default Study;
