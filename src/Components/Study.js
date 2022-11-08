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
  const [finished, setFinished] = React.useState(false);

  const [shuffled, setShuffled] = React.useState(
    flashcards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );
  
  const restart = (onlyUnsure) => {
    if(onlyUnsure){
      setShuffled(unsureCards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value));
    } else {
      setShuffled(flashcards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value));
    }

    setIndex(0);
    setUnsureCards([]);
    setFinished(false);
  }

  const [index, setIndex] = React.useState(0);

  const previous = () => {
    if (index > 0) {
      if (
        unsureCards.length > 0 &&
        unsureCards[unsureCards.length - 1] === shuffled[index - 1]
      ) {
        let tempCards = unsureCards;
        tempCards.pop();
        setUnsureCards(tempCards);
      }
      setIndex(index - 1);
    }
  };

  const unsure = () => {
    let tempCards = unsureCards;
    tempCards.push(shuffled[index]);
    setUnsureCards(tempCards);
    next();
  };

  const next = () => {
    if (index < shuffled.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <>
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
          sx={{ m: 5 }}
        >
          {unsureCards.length > 0 && "Here are the cards you were unsure of"}
          {unsureCards.length === 0 && "Congrats you knew all the cards!"}
        </Typography>
        {unsureCards.map((card) => {
          return <FlashCard key={card[0]} card={card} />;
        })}
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          size="large"
        >
          <Button onClick={() => restart(false)} color="primary">
            Study All Terms
          </Button>
          {unsureCards.length > 0 && <Button onClick={() => restart(true)} color="secondary">
            Study Unsure
          </Button>}
        </ButtonGroup>
      </>
    );
  }

  return (
    <>
      <FlashCard key={shuffled[index][0]} card={shuffled[index]} />

      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        size="large"
      >
        <Button onClick={unsure} color="warning">
          Unsure
        </Button>
        <Button onClick={previous}>Previous</Button>
        <Button onClick={next} color="success">
          Know
        </Button>
      </ButtonGroup>
    </>
  );
};

const FlashCard = (card) => {
  const [expanded, setExpanded] = React.useState(false);
  //console.log(card.card);

  const side1 = card.card[0];
  const side2 = card.card[1];

  return (
    <Card sx={{ maxWidth: 345, m: 4 }}>
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
