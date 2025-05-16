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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  AccessTime,
  CheckCircle,
  Cancel,
  Favorite,
  Notifications,
} from '@mui/icons-material';

const RoutineBuilder = () => {
  const [routines, setRoutines] = useState([]);
  const [products, setProducts] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openRoutineDialog, setOpenRoutineDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    category: '',
    frequency: 'daily',
    timeOfDay: 'morning',
    status: 'tried',
    reminder: false,
  });
  const [currentRoutine, setCurrentRoutine] = useState({
    name: '',
    products: [],
    schedule: [],
  });

  const handleAddProduct = () => {
    if (currentProduct.name && currentProduct.category) {
      setProducts(prev => [...prev, { ...currentProduct, id: Date.now() }]);
      setCurrentProduct({
        name: '',
        category: '',
        frequency: 'daily',
        timeOfDay: 'morning',
        status: 'tried',
        reminder: false,
      });
      setOpenProductDialog(false);
    }
  };

  const handleAddRoutine = () => {
    if (currentRoutine.name && currentRoutine.products.length > 0) {
      setRoutines(prev => [...prev, { ...currentRoutine, id: Date.now() }]);
      setCurrentRoutine({
        name: '',
        products: [],
        schedule: [],
      });
      setOpenRoutineDialog(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'liked': return 'success';
      case 'avoid': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'liked': return <Favorite />;
      case 'avoid': return <Cancel />;
      default: return <CheckCircle />;
    }
  };

  return (
    <Box className="fade-in" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Routine Builder
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Create and manage your personalized skincare routine
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="hover-card">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Your Products</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenProductDialog(true)}
                >
                  Add Product
                </Button>
              </Box>
              <List>
                {products.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.category} • ${product.frequency} • ${product.timeOfDay}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        icon={getStatusIcon(product.status)}
                        label={product.status}
                        color={getStatusColor(product.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <IconButton edge="end" onClick={() => {}}>
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="hover-card">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Your Routines</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenRoutineDialog(true)}
                >
                  Create Routine
                </Button>
              </Box>
              <List>
                {routines.map((routine) => (
                  <ListItem key={routine.id}>
                    <ListItemText
                      primary={routine.name}
                      secondary={`${routine.products.length} products • ${routine.schedule.length} scheduled times`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => {}}>
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Product Dialog */}
      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Product Name"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Category"
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, category: e.target.value }))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={currentProduct.frequency}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, frequency: e.target.value }))}
                label="Frequency"
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="biweekly">Bi-weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Time of Day</InputLabel>
              <Select
                value={currentProduct.timeOfDay}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, timeOfDay: e.target.value }))}
                label="Time of Day"
              >
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="evening">Evening</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={currentProduct.status}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, status: e.target.value }))}
                label="Status"
              >
                <MenuItem value="tried">Tried</MenuItem>
                <MenuItem value="liked">Liked</MenuItem>
                <MenuItem value="avoid">Avoid</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={currentProduct.reminder}
                  onChange={(e) => setCurrentProduct(prev => ({ ...prev, reminder: e.target.checked }))}
                />
              }
              label="Set Reminder"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Routine Dialog */}
      <Dialog open={openRoutineDialog} onClose={() => setOpenRoutineDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Routine</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Routine Name"
              value={currentRoutine.name}
              onChange={(e) => setCurrentRoutine(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle1" gutterBottom>
              Select Products
            </Typography>
            <List>
              {products.map((product) => (
                <ListItem key={product.id}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentRoutine.products.includes(product.id)}
                        onChange={(e) => {
                          const newProducts = e.target.checked
                            ? [...currentRoutine.products, product.id]
                            : currentRoutine.products.filter(id => id !== product.id);
                          setCurrentRoutine(prev => ({ ...prev, products: newProducts }));
                        }}
                      />
                    }
                    label={product.name}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoutineDialog(false)}>Cancel</Button>
          <Button onClick={handleAddRoutine} variant="contained">
            Create Routine
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoutineBuilder; 