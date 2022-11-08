import React from "react";

import {
  Typography,
  Container,
  Button,
  ButtonGroup,
  TextField,
  Card,
  CardContent,
  CardActionArea,
  Collapse,
} from "@mui/material";

function App() {
  const [list, setList] = React.useState("");
  const [flashcards, setFlashcards] = React.useState([]);
  const [studying, setStudying] = React.useState(false);

  if (studying) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: 10 }} align="center">
        <EditList setStudying={setStudying} />
        <Study flashcards={flashcards} />
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }} align="center">
      <Title list={list} setList={setList} />
      <SetList
        list={list}
        flashcards={flashcards}
        setFlashcards={setFlashcards}
        setStudying={setStudying}
      />
    </Container>
  );
}

const Title = ({ list, setList }) => {
  const [rows, setRows] = React.useState(10);

  React.useEffect(() => {
    const lines = (list.match(/\n/g) || "").length + 1;
    if (lines >= 10) {
      setRows(lines + 1);
    } else {
      setRows(10);
    }
  }, [list]);

  return (
    <>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        Quick Cards: Make flashcards quick
      </Typography>
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Type in a list! Each line is a card, each side seperate with a ":"
      </Typography>

      <TextField
        margin="normal"
        variant="filled"
        required
        fullWidth
        id="list-editor"
        label="List-Editor"
        name="List-Editor"
        value={list}
        rows={rows}
        onChange={(e) => setList(e.target.value)}
        multiline
        autoFocus
      />
    </>
  );
};

const SetList = ({ list, flashcards, setFlashcards, setStudying }) => {
  const onPress = () => {
    let tempArray = list.split("\n");
    let tempCards = [];
    for (const line of tempArray) {
      let temp = line.split(":");
      tempCards.push(temp);
    }

    setFlashcards(tempCards.slice(0));
    setStudying(true);
  };

  return (
    <Button variant="contained" onClick={onPress}>
      Start Studying
    </Button>
  );
};

const EditList = ({ setStudying }) => {
  const onPress = () => {
    setStudying(false);
  };
  return (
    <Button variant="contained" onClick={onPress}>
      Edit List
    </Button>
  );
};

const Study = ({ flashcards }) => {
  const shuffled = flashcards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const [index, setIndex] = React.useState(0);

  const previous = () => {
    if(index > 0){
      setIndex(index - 1);
    }
  }
  const next = () => {
    if(index < shuffled.length - 1){
      setIndex(index + 1);
    }
  }

  return (
    <>
      <FlashCard key={shuffled[index][0]} card={shuffled[index]} />

      <ButtonGroup variant="text" aria-label="text button group" size="large">
        <Button onClick={previous}>Previous</Button>
        <Button onClick={next}>Next</Button>
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

export default App;
