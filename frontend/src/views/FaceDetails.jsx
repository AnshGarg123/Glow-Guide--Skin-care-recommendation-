import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { putForm } from '../controllers/actions';

const allFeatures = [
  "normal", "dry", "oily", "combination", "acne", "sensitive", "fine lines", "wrinkles", "redness",
  "dull", "pore", "pigmentation", "blackheads", "whiteheads", "blemishes", "dark circles", "eye bags", "dark spots"
];

const toneDescriptions = {
  1: "Very Fair",
  2: "Fair",
  3: "Light",
  4: "Medium",
  5: "Tan",
  6: "Deep"
};

const mainTypes = ["normal", "dry", "oily", "combination"];

const featureDescriptions = {
  sensitive: "Sensitive skin",
  "fine lines": "Fine lines",
  wrinkles: "Wrinkles",
  redness: "Redness",
  dull: "Dullness",
  pore: "Enlarged pores",
  pigmentation: "Pigmentation",
  blackheads: "Blackheads",
  whiteheads: "Whiteheads",
  blemishes: "Blemishes",
  "dark circles": "Dark circles",
  "eye bags": "Eye bags",
  "dark spots": "Dark spots"
};

const FaceDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state?.data || {};

  // Build features vector for recommendations
  const features = {};
  allFeatures.forEach(f => { features[f] = 0; });
  if (data.type && features.hasOwnProperty(data.type.toLowerCase())) {
    features[data.type.toLowerCase()] = 1;
  }
  if (data.acne !== "Low") features["acne"] = 1;

  // Find all detected main skin types
  const detectedTypes = Object.entries(data.features || {})
    .filter(([k, v]) => mainTypes.includes(k) && v === 1)
    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));
  const skinTypeSentence = detectedTypes.length > 1
    ? `Combination (${detectedTypes.join(", ")})`
    : detectedTypes[0] || data.type;

  // Find all other detected features (user-friendly)
  const otherDetected = Object.entries(data.features || {})
    .filter(([k, v]) => v === 1 && featureDescriptions[k])
    .map(([k]) => featureDescriptions[k]);

  const handleRecommend = () => {
    putForm(features, data.type, data.tone, navigate);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Face Analysis Results</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {data.type && data.tone && data.acne ? (
          <>
            Your skin type is <b>{skinTypeSentence}</b>.<br/>
            Your skin tone is <b>{toneDescriptions[data.tone] || data.tone}</b> {toneDescriptions[data.tone] ? <span style={{color:'#888'}}>(Tone {data.tone})</span> : null}.<br/>
            Acne severity detected: <b>{data.acne === 'Low' ? 'Not detected' : data.acne}</b>.<br/>
            {otherDetected.length > 0 && (
              <>
                <br/>Other detected skin concerns:
                <ul>
                  {otherDetected.map((desc) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        ) : (
          "Could not detect all face details."
        )}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRecommend}>
        Get Recommendations
      </Button>
    </Container>
  );
};

export default FaceDetails; 