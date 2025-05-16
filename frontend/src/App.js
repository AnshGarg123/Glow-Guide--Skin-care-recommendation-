import React, { useState } from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";

import ImageInput from "./views/imageInput";
import Recommendations from './views/Recommendations'
import Form from "./views/Form";
import DailyTips from "./views/DailyTips";
import ProgressTracker from "./views/ProgressTracker";
import RoutineBuilder from "./views/RoutineBuilder";
import FaceDetails from "./views/FaceDetails";

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SpaIcon from '@mui/icons-material/Spa';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import BuildIcon from '@mui/icons-material/Build';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                SkinCare AI
              </Typography>
              <Button
                component={Link}
                to="/daily-tips"
                color="inherit"
                startIcon={<SpaIcon />}
                sx={{ mr: 2 }}
              >
                Daily Tips
              </Button>
              <Button
                component={Link}
                to="/progress"
                color="inherit"
                startIcon={<CompareArrowsIcon />}
                sx={{ mr: 2 }}
              >
                Progress
              </Button>
              <Button
                component={Link}
                to="/routine"
                color="inherit"
                startIcon={<BuildIcon />}
                sx={{ mr: 2 }}
              >
                Routine
              </Button>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Switch>
              <Route path="/" element={<ImageInput />} />
              <Route path="/face-details" element={<FaceDetails />} />
              <Route path="/form" element={<Form />} />
              <Route path="/recs" element={<Recommendations />} />
              <Route path="/daily-tips" element={<DailyTips />} />
              <Route path="/progress" element={<ProgressTracker />} />
              <Route path="/routine" element={<RoutineBuilder />} />
            </Switch>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
