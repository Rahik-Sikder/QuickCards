import React from "react";

import {
  Typography,
  Container,
  Button,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import Study from "./Components/Study";

const useStorageState = (key, intialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || intialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  // console.log("Use storage state value: " + value);
  return [value, setValue];
};

function App() {
  const [list, setList] = useStorageState("list", "");
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

  const theme = createTheme({
    palette: {
      background: {
      },  
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="lg" sx={{ marginTop: 10 }} align="center">
      <Title list={list} setList={setList} />
      <SetList
        list={list}
        flashcards={flashcards}
        setFlashcards={setFlashcards}
        setStudying={setStudying}
      />
    </Container>
    </ThemeProvider>
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

export default App;
