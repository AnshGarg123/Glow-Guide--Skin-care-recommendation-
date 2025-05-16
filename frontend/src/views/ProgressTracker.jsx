import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Paper,
} from '@mui/material';
import {
  AddPhotoAlternate,
  CompareArrows,
  Delete,
  CalendarToday,
} from '@mui/icons-material';

const ProgressTracker = () => {
  const [entries, setEntries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    beforeImage: null,
    afterImage: null,
  });

  const handleImageUpload = (type) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentEntry(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEntry = () => {
    if (currentEntry.beforeImage && currentEntry.afterImage) {
      setEntries(prev => [...prev, { ...currentEntry, id: Date.now() }]);
      setCurrentEntry({
        date: new Date().toISOString().split('T')[0],
        notes: '',
        beforeImage: null,
        afterImage: null,
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <Box className="fade-in" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Progress Tracker
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Track your skincare journey with before and after photos
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddPhotoAlternate />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 4 }}
      >
        Add New Progress Entry
      </Button>

      <Grid container spacing={3}>
        {entries.map((entry) => (
          <Grid item xs={12} md={6} key={entry.id}>
            <Card className="hover-card">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {new Date(entry.date).toLocaleDateString()}
                  </Typography>
                  <IconButton onClick={() => handleDeleteEntry(entry.id)}>
                    <Delete />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>Before</Typography>
                    <img
                      src={entry.beforeImage}
                      alt="Before"
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom>After</Typography>
                    <img
                      src={entry.afterImage}
                      alt="After"
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Grid>
                </Grid>
                {entry.notes && (
                  <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="body2">{entry.notes}</Typography>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Progress Entry</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              type="date"
              label="Date"
              value={currentEntry.date}
              onChange={(e) => setCurrentEntry(prev => ({ ...prev, date: e.target.value }))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<AddPhotoAlternate />}
                >
                  Upload Before Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload('beforeImage')}
                  />
                </Button>
                {currentEntry.beforeImage && (
                  <img
                    src={currentEntry.beforeImage}
                    alt="Before"
                    style={{ width: '100%', marginTop: '8px', borderRadius: '8px' }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<AddPhotoAlternate />}
                >
                  Upload After Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload('afterImage')}
                  />
                </Button>
                {currentEntry.afterImage && (
                  <img
                    src={currentEntry.afterImage}
                    alt="After"
                    style={{ width: '100%', marginTop: '8px', borderRadius: '8px' }}
                  />
                )}
              </Grid>
            </Grid>
            <TextField
              label="Notes"
              multiline
              rows={4}
              value={currentEntry.notes}
              onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddEntry}
            variant="contained"
            disabled={!currentEntry.beforeImage || !currentEntry.afterImage}
          >
            Save Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgressTracker; 