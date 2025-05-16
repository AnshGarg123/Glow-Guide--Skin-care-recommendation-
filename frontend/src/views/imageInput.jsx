import React, { useState, useRef, useEffect } from 'react';
import { UploadImage } from '../controllers/actions'
import { useNavigate } from 'react-router-dom';

import WebcamCapture from './Components/webCam'

// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ImageInput() {
    const [landingPage, setLandingPage] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (imageSrc !== null) {
            console.log("we got an image")
            UploadImage(imageSrc, navigate)
        }
    }, [imageSrc, navigate]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <Container maxWidth="xs" sx={{padding: 0}} alignitems="center">
                <Grid container justify="center" sx={{maxHeight:"100vh"}} spacing={1}>
                    {landingPage ? 
                        <Grid item xs={12} sx={{margin:"35vh auto"}} textAlign="center">
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" gutterBottom>
                                    Analyze Your Skin
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Take a photo or upload an image to get personalized skincare recommendations
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button 
                                    onClick={() => {setLandingPage(false)}} 
                                    variant="contained"
                                    startIcon={<PhotoCameraIcon />}
                                    sx={{ minWidth: '140px' }}>
                                    Take Photo
                                </Button>
                                <Button 
                                    onClick={handleUploadClick}
                                    variant="outlined"
                                    startIcon={<UploadFileIcon />}
                                    sx={{ minWidth: '140px' }}>
                                    Upload Photo
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </Box>
                        </Grid>:
                        <WebcamCapture setImageSrc={setImageSrc}/>
                    }
                </Grid>   
            </Container>
        </>
    )
}

export default ImageInput
