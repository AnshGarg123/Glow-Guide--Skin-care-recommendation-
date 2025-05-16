import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  WbSunny,
  LocalDrink,
  Face,
  Spa,
  Restaurant,
  DirectionsRun,
} from '@mui/icons-material';

const DailyTips = () => {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState({
    morning: [
      { title: 'Cleanse', description: 'Use a gentle cleanser to remove overnight buildup' },
      { title: 'Tone', description: 'Apply a pH-balancing toner to prepare skin for products' },
      { title: 'Moisturize', description: 'Hydrate with a lightweight moisturizer' },
      { title: 'Protect', description: 'Apply broad-spectrum SPF 30+ sunscreen' },
    ],
    evening: [
      { title: 'Double Cleanse', description: 'Remove makeup and impurities thoroughly' },
      { title: 'Treat', description: 'Apply targeted treatments for specific concerns' },
      { title: 'Hydrate', description: 'Use a richer moisturizer for overnight repair' },
    ],
    lifestyle: [
      { title: 'Stay Hydrated', description: 'Drink 8 glasses of water daily' },
      { title: 'Healthy Diet', description: 'Include antioxidant-rich foods' },
      { title: 'Exercise', description: 'Regular physical activity improves circulation' },
      { title: 'Sleep Well', description: 'Aim for 7-8 hours of quality sleep' },
    ],
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const TipCard = ({ title, items, icon }) => (
    <Card className="hover-card" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" component="div" ml={1}>
            {title}
          </Typography>
        </Box>
        <List>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
              {index < items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom>
        Your Daily Skincare Guide
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Follow these recommendations for healthy, glowing skin
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <TipCard
            title="Morning Routine"
            items={tips.morning}
            icon={<WbSunny color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TipCard
            title="Evening Routine"
            items={tips.evening}
            icon={<Face color="secondary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TipCard
            title="Lifestyle Tips"
            items={tips.lifestyle}
            icon={<Spa color="success" />}
          />
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }} className="hover-card">
        <Typography variant="h6" gutterBottom>
          Today's Special Focus: Acne Prevention
        </Typography>
        <Typography variant="body1" paragraph>
          • Keep your hands away from your face throughout the day
          • Use non-comedogenic products
          • Change pillowcases weekly
          • Avoid touching or picking at blemishes
        </Typography>
        <Chip
          label="Track Progress"
          color="primary"
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
};

export default DailyTips; 