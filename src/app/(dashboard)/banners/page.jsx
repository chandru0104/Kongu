// components/BannerManagementMUI.jsx
'use client'

import React, { useState, useCallback } from 'react'

import {
  Box,
  Typography,
  Container,
  Card,
  useTheme,
  Button,
  Grid,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip // Chip added for status display
} from '@mui/material'

import {
  Info as InfoIcon,
  CloudUpload as CloudUploadIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Image as ImageIcon,
  Add as AddIcon, // AddIcon for the new button
  Search as SearchIcon // SearchIcon for the search bar styling
} from '@mui/icons-material'

import { blue, green, red, grey } from '@mui/material/colors'

// =======================================================
// 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// =======================================================

const BANNER_GUIDELINES = [
  'Use high-quality landscape images for best results',
  'Recommended resolution: 1200 x 400 pixels',
  'Images are automatically optimized without quality loss',
  'Original file size limit: 5MB (compressed automatically)',
  'Supported formats: JPG, PNG, GIF',
  'Maximum 5 banners allowed'
]

const MAX_BANNERS = 5

const initialBanners = [
  { id: 1, url: '/img/banner1.jpg', fileName: 'school_ground.jpg' },
  { id: 2, url: '/img/banner2.jpg', fileName: 'cultural_fest.jpg' }
  // Add more dummy banners up to 5 if needed
]

// ------------------------------------------------------------------
// 🔨 Reusable Components: Banner Guideline Box
// ------------------------------------------------------------------

const GuidelineBox = () => {
  const theme = useTheme()
  return (
    <Card
      sx={{
        p: 3,
        mb: 4,
        bgcolor: blue[50],
        borderLeft: `5px solid ${theme.palette.info.main}`,
        borderRadius: 2 // Increased border radius for consistency
      }}
    >
      <Box display='flex' alignItems='center' mb={1}>
        <InfoIcon color='info' sx={{ mr: 1 }} />
        <Typography variant='subtitle1' fontWeight='bold' color='text.primary'>
          Banner Guidelines
        </Typography>
      </Box>
      <List dense sx={{ ml: -2 }}>
        {BANNER_GUIDELINES.map((guideline, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText
              primary={
                <Typography variant='body2' color='text.secondary'>
                  • {guideline}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

// ------------------------------------------------------------------
// ⭐ முக்கிய BannerManagementMUI Component
// ------------------------------------------------------------------

const BannerManagementMUI = () => {
  const theme = useTheme()
  const [currentBanners, setCurrentBanners] = useState(initialBanners)
  const [filesToUpload, setFilesToUpload] = useState([])

  const handleFileUpload = event => {
    const newFiles = Array.from(event.target.files)
    const totalCount = currentBanners.length + filesToUpload.length + newFiles.length

    if (totalCount > MAX_BANNERS) {
      alert(`Maximum ${MAX_BANNERS} banners allowed. You tried to upload too many.`)

      return
    }

    // Simulate file validation (basic name and size check)
    const validFiles = newFiles.map(file => ({
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2), // Size in MB
      status: 'Ready to upload'
    }))

    setFilesToUpload(prev => [...prev, ...validFiles])
  }

  const handleRemoveFile = indexToRemove => {
    setFilesToUpload(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleRemoveCurrentBanner = id => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setCurrentBanners(prev => prev.filter(banner => banner.id !== id))
    }
  }

  const handleRefresh = () => {
    setCurrentBanners(initialBanners)
    setFilesToUpload([])
    alert('Banners list refreshed')
  }

  const handleCreateBannerClick = () => {
    document.getElementById('file-upload-input').click()
  }

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Container maxWidth='lg' sx={{ pt: 3, pb: 5 }}>
        {/* --- 1. Page Header (Events Management Style) --- */}
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
          <Box display='flex' alignItems='center'>
            <ImageIcon sx={{ mr: 1.5, fontSize: 35, color: 'primary.main' }} />
            <Box>
              <Typography variant='h5' component='h1' fontWeight='bold'>
                Banner Management
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Manage website hero banners and images
              </Typography>
            </Box>
          </Box>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            size='large'
            onClick={handleCreateBannerClick}
            disabled={currentBanners.length + filesToUpload.length >= MAX_BANNERS}
          >
            Upload New Banner
          </Button>
        </Box>

        {/* --- 2. Search & Refresh Bar (Modified from Events Management) --- */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={11}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' color='text.secondary' sx={{ mr: 2 }}>
                  Manage Banners:
                </Typography>
                <Chip
                  label={`Active Banners: ${currentBanners.length}/${MAX_BANNERS}`}
                  variant='filled'
                  color={currentBanners.length < MAX_BANNERS ? 'primary' : 'warning'}
                  sx={{ mr: 1.5, fontWeight: 'bold' }}
                />
                <Chip
                  label={`Pending Uploads: ${filesToUpload.length}`}
                  variant='filled'
                  color={filesToUpload.length > 0 ? 'secondary' : 'default'}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <IconButton color='primary' onClick={handleRefresh} size='large'>
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>

        {/* --- 3. Guidelines --- */}
        <GuidelineBox />

        {/* --- 4. Upload Section (File Drop Area) --- */}
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
          Upload Banner Images
        </Typography>

        <Paper
          variant='outlined'
          sx={{
            p: 5,
            mb: 4,
            textAlign: 'center',
            borderStyle: 'dashed',
            borderColor: grey[400],
            cursor: 'pointer',
            borderRadius: 2
          }}
          onClick={handleCreateBannerClick}
        >
          <input
            type='file'
            id='file-upload-input'
            multiple
            accept='.jpg,.png,.gif'
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <CloudUploadIcon sx={{ fontSize: 40, color: blue[500], mb: 1 }} />
          <Typography variant='body1' color={blue[500]} fontWeight='bold'>
            Drag & Drop or Click to upload files
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            JPG, PNG, GIF supported (Auto-compressed) - {filesToUpload.length} files selected
          </Typography>
          <Typography variant='body2' color={red[500]} fontWeight='bold' mt={1}>
            {currentBanners.length + filesToUpload.length >= MAX_BANNERS
              ? `Maximum limit of ${MAX_BANNERS} banners reached or exceeded.`
              : `Remaining slots: ${MAX_BANNERS - currentBanners.length - filesToUpload.length}`}
          </Typography>
        </Paper>

        {/* --- 5. Display Files to Upload (Changed to Paper/Card style) --- */}
        {filesToUpload.length > 0 && (
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant='h6' fontWeight='bold' gutterBottom>
              Files Pending Upload: ({filesToUpload.length})
            </Typography>
            <List dense>
              {filesToUpload.map((fileItem, index) => (
                <ListItem
                  key={index}
                  sx={{ borderBottom: `1px solid ${grey[200]}`, '&:last-child': { borderBottom: 'none' } }}
                  secondaryAction={
                    <IconButton edge='end' onClick={() => handleRemoveFile(index)} size='small'>
                      <CloseIcon sx={{ color: red[500] }} />
                    </IconButton>
                  }
                >
                  <Box display='flex' alignItems='center' flexGrow={1}>
                    <CheckCircleIcon sx={{ color: green[600], mr: 2 }} />
                    <ListItemText
                      primary={
                        <Typography variant='body1' fontWeight='medium'>
                          {fileItem.name}
                        </Typography>
                      }
                      secondary={`${fileItem.size} MB | ${fileItem.status}`}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            <Box display='flex' justifyContent='flex-end' mt={2}>
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  alert(`Uploading ${filesToUpload.length} file(s)...`)
                  setFilesToUpload([]) // Clear after simulating upload
                }}
              >
                Start Upload ({filesToUpload.length})
              </Button>
            </Box>
          </Paper>
        )}

        {/* --- 6. Current Banners List --- */}
        <Typography variant='h6' fontWeight='bold' sx={{ mt: 4, mb: 2 }}>
          Current Live Banners ({currentBanners.length})
        </Typography>

        <Grid container spacing={3}>
          {currentBanners.map((banner, index) => (
            <Grid item xs={12} sm={6} md={4} key={banner.id}>
              <Card elevation={1} sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 150,
                    bgcolor: grey[200],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='caption' color='text.secondary'>
                    {banner.fileName} Preview
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <IconButton
                    size='small'
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', '&:hover': { bgcolor: 'white' } }}
                    onClick={() => handleRemoveCurrentBanner(banner.id)}
                  >
                    <CloseIcon fontSize='small' sx={{ color: red[600] }} />
                  </IconButton>
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography variant='body2' fontWeight='medium'>
                    File: {banner.fileName}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}

          {currentBanners.length === 0 && (
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 5, textAlign: 'center', color: 'text.secondary', borderRadius: 2 }}>
                <Typography>No active banners found. Upload new banners above.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default BannerManagementMUI
