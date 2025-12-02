// components/ExamClassSelectorMUI.jsx or exam-management/page.jsx
'use client'

import React, { useState, useMemo } from 'react'

import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  useTheme,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Grid,
  Paper,
  IconButton,
  Chip
} from '@mui/material'

import {
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  LibraryBooks as LibraryBooksIcon,
  Refresh as RefreshIcon,
  Add as AddIcon
} from '@mui/icons-material'

// =======================================================
// 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// =======================================================

// மாதிரி வகுப்பு தரவு (Sample Class Data based on your image)
const initialClasses = [
  { id: 1, name: 'Trial class students', students: 15, created: '6/8/2025', iconChar: 'T' },
  { id: 2, name: 'XII CD', students: 27, created: '6/8/2025', iconChar: 'X' },
  { id: 3, name: 'XII AB Girls', students: 21, created: '6/8/2025', iconChar: 'X' },
  { id: 4, name: 'XII AB Boys', students: 29, created: '6/8/2025', iconChar: 'X' },
  { id: 5, name: 'XI CD', students: 27, created: '6/8/2025', iconChar: 'X' },
  { id: 6, name: 'XI AB NON NEET', students: 31, created: '6/8/2025', iconChar: 'X' },
  { id: 7, name: 'XI AB NEET', students: 7, created: '6/8/2025', iconChar: 'X' },
  { id: 8, name: 'X B2', students: 35, created: '6/8/2025', iconChar: 'X' },
  { id: 9, name: 'X A1', students: 32, created: '6/8/2025', iconChar: 'X' },
  { id: 10, name: 'IX Sec B', students: 28, created: '6/8/2025', iconChar: 'I' }
]

const totalClasses = initialClasses.length

// =======================================================
// 🔨 Reusable Components (Class Avatar)
// =======================================================

const ClassAvatar = ({ char, isTrial }) => {
  const theme = useTheme()
  const color = isTrial ? theme.palette.info.main : theme.palette.primary.main

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        boxShadow: `0 2px 5px ${color}30`
      }}
    >
      {char}
    </Box>
  )
}

// ------------------------------------------------------------------
// ⭐ முக்கிய ExamClassSelectorMUI Component
// ------------------------------------------------------------------
const ExamClassSelectorMUI = () => {
  const theme = useTheme()

  const [searchTerm, setSearchTerm] = useState('')
  const [inputTerm, setInputTerm] = useState('')
  const [classList] = useState(initialClasses) // Removed setClassList since it's not used for modifying the list, only for search.

  const filteredClasses = useMemo(() => {
    return classList.filter(classItem => classItem.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, classList])

  const totalFilteredClasses = filteredClasses.length

  // Handlers
  const handleSearch = () => {
    setSearchTerm(inputTerm)
  }

  const handleClear = () => {
    setInputTerm('')
    setSearchTerm('')
  }

  const handleClassSelect = classItem => {
    console.log(`Navigating to Exam Management for: ${classItem.name}`)
    alert(`Selected Class: ${classItem.name}`)
  }

  const handleAddClass = () => {
    alert('Open Dialog for New Class Creation')
  }

  // ------------------------------------------------------------------
  // UI Component: Page Header
  // ------------------------------------------------------------------
  const PageHeader = ({ handleAddClass }) => (
    <Paper
      elevation={2}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        p: 2,
        mb: 4,
        borderRadius: 0,
        borderBottom: '1px solid #eee'
      }}
    >
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' alignItems='center'>
            <LibraryBooksIcon sx={{ mr: 1.5, fontSize: 35, color: 'primary.main' }} />
            <Box>
              <Typography variant='h5' component='h1' fontWeight='bold'>
                Exam Management
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Select a class to manage exams, scores, and reports
              </Typography>
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Container>
    </Paper>
  )

  // ------------------------------------------------------------------
  // UI Rendering: Main Component
  // ------------------------------------------------------------------
  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* --- 1. Page Header --- */}
      <PageHeader handleAddClass={handleAddClass} />
      <Container maxWidth='lg' sx={{ py: 2 }}>
        {/* --- 2. Search & Filter Bar --- */}
        <Card elevation={1} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
          <Typography variant='h6' gutterBottom fontWeight='bold' color='text.primary'>
            Search and Select Class
          </Typography>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label='Search Class Name (e.g., XII AB Boys)'
                name='search'
                variant='outlined'
                size='medium'
                value={inputTerm}
                onChange={e => setInputTerm(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleSearch()
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon color='action' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display='flex' gap={1}>
                <Button variant='contained' color='primary' onClick={handleSearch} sx={{ flexGrow: 1 }}>
                  Search
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClear} sx={{ flexGrow: 1 }}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>

        <Typography variant='h5' component='h2' fontWeight='bold' sx={{ mb: 2 }}>
          Class List ({totalFilteredClasses} classes)
        </Typography>

        {/* --- 3. Class List --- */}
        <Card elevation={1} sx={{ borderRadius: 2 }}>
          <List disablePadding>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, index) => (
                <React.Fragment key={classItem.id}>
                  <ListItem
                    onClick={() => handleClassSelect(classItem)}
                    secondaryAction={<ChevronRightIcon color='primary' />}
                    sx={{
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      },
                      py: 2
                    }}
                  >
                    <ListItemIcon>
                      <ClassAvatar char={classItem.iconChar} isTrial={classItem.name.includes('Trial')} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant='subtitle1' fontWeight='bold'>
                          {classItem.name}
                        </Typography>
                      }
                      secondary={
                        <Box component='span'>
                          <Typography component='span' variant='body2' color='text.primary' fontWeight='medium'>
                            {classItem.students} students
                          </Typography>
                          <Typography component='span' variant='body2' color='text.secondary'>
                            {' '}
                            • Created: {classItem.created}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {/* Only show divider between items */}
                  {index < filteredClasses.length - 1 && <Divider component='li' />}
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  sx={{ textAlign: 'center', py: 3 }}
                  primary={
                    <Typography variant='body1' color='text.secondary'>
                      No classes found matching &quot;{searchTerm}&quot;
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </Card>

        {/* --- 4. Count Display --- */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 3, p: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Showing 1 - {totalFilteredClasses} of {totalFilteredClasses} classes
            {searchTerm && (
              <Chip label={`Filtered from ${totalClasses}`} size='small' sx={{ ml: 1, color: 'text.secondary' }} />
            )}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default ExamClassSelectorMUI
