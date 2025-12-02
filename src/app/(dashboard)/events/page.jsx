// components/EventsManagementMUI.jsx
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
  Grid,
  Paper,
  IconButton,
  Chip,
  Select,
  MenuItem,
  Pagination
} from '@mui/material'

import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  CalendarMonth as CalendarMonthIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  Image as ImageIcon
} from '@mui/icons-material'

import { green, blue, grey, red } from '@mui/material/colors'

// =======================================================
// 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// =======================================================

const initialEvents = [
  {
    id: 1,
    title: 'TRITIYA SOPAN CAMP',
    status: 'Ongoing',
    description: 'Camp – Perundurai Scout District. Venue: Karunya Vidyan bhavan Matriculation Higher Secondary School',
    dateRange: '11th September 2025 – 13th September 2025',
    dateRelative: '63 days ago',
    expiresIn: '1505 days',
    images: 5,
    previewImages: ['/placeholder/img1.jpg', '/placeholder/img2.jpg', '/placeholder/img3.jpg', '/placeholder/img4.jpg']
  },
  {
    id: 2,
    title: 'SPORTS DAY PRACTICE',
    status: 'Upcoming',
    description: 'Morning practice for all participants of the annual sports day event.',
    dateRange: '18th November 2025',
    dateRelative: '2 days away',
    expiresIn: '1540 days',
    images: 1,
    previewImages: ['/placeholder/img5.jpg']
  },
  {
    id: 3,
    title: 'SCHOOL CULTURAL FEST',
    status: 'Past',
    description: 'Inter-school cultural competition held last month with grand participation.',
    dateRange: '20th October 2025',
    dateRelative: '28 days ago',
    expiresIn: 'Expired',
    images: 10,
    previewImages: ['/placeholder/img6.jpg', '/placeholder/img7.jpg']
  },
  {
    id: 4,
    title: 'NEET COACHING WORKSHOP',
    status: 'Upcoming',
    description: 'Physics and Chemistry focus session for XII grade students.',
    dateRange: '25th November 2025',
    dateRelative: '9 days away',
    expiresIn: '1550 days',
    images: 0,
    previewImages: []
  },
  {
    id: 5,
    title: "ANNUAL TEACHER'S MEET",
    status: 'Past',
    description: 'Review of academic performance and future strategies for the new academic year.',
    dateRange: '5th October 2025',
    dateRelative: '42 days ago',
    expiresIn: 'Expired',
    images: 2,
    previewImages: ['/placeholder/img8.jpg', '/placeholder/img9.jpg']
  },
  {
    id: 6,
    title: 'SCIENCE EXHIBITION SETUP',
    status: 'Ongoing',
    description: 'Setting up stalls for the district-level science fair and project display.',
    dateRange: '17th November 2025',
    dateRelative: 'Today',
    expiresIn: '1500 days',
    images: 7,
    previewImages: [
      '/placeholder/img10.jpg',
      '/placeholder/img11.jpg',
      '/placeholder/img12.jpg',
      '/placeholder/img13.jpg'
    ]
  },
  {
    id: 7,
    title: 'PARENT-TEACHER MEETING (IX-XI)',
    status: 'Upcoming',
    description: 'Mandatory meeting for discussing student progress and disciplinary matters.',
    dateRange: '2nd December 2025',
    dateRelative: '16 days away',
    expiresIn: '1565 days',
    images: 0,
    previewImages: []
  },
  {
    id: 8,
    title: 'REPUBLIC DAY CELEBRATION',
    status: 'Upcoming',
    description: 'Parade practice and cultural performance selection for the grand event.',
    dateRange: '26th January 2026',
    dateRelative: 'In 2 months',
    expiresIn: '1620 days',
    images: 0,
    previewImages: []
  },
  {
    id: 9,
    title: 'ALUMNI MEET',
    status: 'Past',
    description: 'Reunion of 1990-2000 batch alumni at the school auditorium.',
    dateRange: '1st September 2025',
    dateRelative: '77 days ago',
    expiresIn: 'Expired',
    images: 15,
    previewImages: [
      '/placeholder/img14.jpg',
      '/placeholder/img15.jpg',
      '/placeholder/img16.jpg',
      '/placeholder/img17.jpg'
    ]
  },
  {
    id: 10,
    title: 'MIDTERM EXAM REVALUATION',
    status: 'Ongoing',
    description: 'Revaluation process for the Midterm examinations for students who applied.',
    dateRange: '15th November 2025 – 22nd November 2025',
    dateRelative: '3 days ago',
    expiresIn: '1502 days',
    images: 3,
    previewImages: ['/placeholder/img18.jpg', '/placeholder/img19.jpg', '/placeholder/img20.jpg']
  }
]

const totalEvents = initialEvents.length

// ------------------------------------------------------------------
// 🔨 Reusable Components: Event Card
// ------------------------------------------------------------------

const EventCard = ({ event }) => {
  const theme = useTheme()

  const StatusChip = ({ status }) => {
    let color = grey[500]
    if (status === 'Ongoing') color = green[600]
    if (status === 'Upcoming') color = blue[600]

    return (
      <Chip
        label={status}
        size='small'
        sx={{
          bgcolor: color,
          color: 'white',
          fontWeight: 'bold',
          height: '20px',
          mb: 1
        }}
      />
    )
  }

  return (
    <Card elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box display='flex' justifyContent='space-between' alignItems='flex-start' mb={1}>
        <Box>
          <Typography variant='h6' fontWeight='bold' color='text.primary'>
            {event.title}
          </Typography>
          <StatusChip status={event.status} />
        </Box>
        <Box>
          <IconButton size='small' sx={{ color: blue[500], mr: 1 }} onClick={() => alert(`Edit ${event.title}`)}>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' sx={{ color: red[500] }} onClick={() => alert(`Delete ${event.title}`)}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>

      <Typography variant='body2' color='text.secondary' mb={1}>
        {event.description}
      </Typography>
      <Typography variant='body2' color='text.primary' fontWeight='medium' mb={2}>
        Date: {event.dateRange}
      </Typography>

      <Grid container spacing={2} alignItems='center' mb={2}>
        <Grid item xs={12} sm={6}>
          <Box display='flex' alignItems='center'>
            <CalendarMonthIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 18 }} />
            <Typography variant='body2' fontWeight='medium'>
              Event Date:
              <Typography component='span' variant='body2' color='text.secondary' sx={{ ml: 1 }}>
                {event.dateRelative}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display='flex' alignItems='center'>
            <AccessTimeIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 18 }} />
            <Typography variant='body2' fontWeight='medium'>
              Expires At:
              <Typography component='span' variant='body2' color='text.secondary' sx={{ ml: 1 }}>
                {event.expiresIn}
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Image Previews */}
      <Box display='flex' alignItems='center' mt={2} overflow='hidden'>
        {event.previewImages.slice(0, 4).map((src, index) => (
          <Box
            key={index}
            sx={{
              width: 60,
              height: 40,
              borderRadius: 1,
              mr: 1,
              backgroundColor: grey[300],
              // Note: Actual image paths are placeholders. In a real app, use imported images or valid URLs.
            }}
          >
            {/* Placeholder to mimic image display */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: grey[300],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: grey[700],
                fontSize: '0.6rem'
              }}
            >
              IMG
            </Box>
          </Box>
        ))}
        {event.images > 4 && (
          <Chip
            icon={<ImageIcon />}
            label={`${event.images - 4} Images`}
            size='small'
            sx={{ bgcolor: blue[50], color: blue[600], fontWeight: 'bold' }}
          />
        )}
      </Box>
    </Card>
  )
}

// ------------------------------------------------------------------
// ⭐ முக்கிய EventsManagementMUI Component
// ------------------------------------------------------------------
const EventsManagementMUI = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  // 🔥 இங்கே 10 ஆக மாற்றப்பட்டுள்ளது (Changed to 10 here)
  const eventsPerPage = 10

  // Filtering Logic (Basic implementation)
  const filteredEvents = useMemo(() => {
    return initialEvents.filter(event => {
      const statusMatch = statusFilter === 'All' || event.status === statusFilter
      const searchMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase())

      return statusMatch && searchMatch
    })
  }, [searchTerm, statusFilter])

  // Pagination Logic
  const totalItems = filteredEvents.length
  const totalPages = Math.ceil(totalItems / eventsPerPage)

  const paginatedEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  const handleCreateEvent = () => {
    alert('Navigate to Create Event Form')
  }

  const handleRefresh = () => {
    alert('Refreshing Events List...')
  }

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Container maxWidth='lg' sx={{ pt: 3, pb: 5 }}>
        {/* --- 1. Page Header --- */}
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
          <Box display='flex' alignItems='center'>
            <CalendarMonthIcon sx={{ mr: 1.5, fontSize: 35, color: 'primary.main' }} />
            <Box>
              <Typography variant='h5' component='h1' fontWeight='bold'>
                Events Management
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Manage school events and announcements
              </Typography>
            </Box>
          </Box>
          <Button variant='contained' startIcon={<AddIcon />} size='large' onClick={handleCreateEvent}>
            Create Event
          </Button>
        </Box>

        {/* --- 2. Search & Filter Bar --- */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                placeholder='Search events...'
                variant='outlined'
                size='small'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon color='action' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={8} sm={3}>
              <Select
                fullWidth
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                variant='outlined'
                size='small'
              >
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Ongoing'>Ongoing</MenuItem>
                <MenuItem value='Upcoming'>Upcoming</MenuItem>
                <MenuItem value='Past'>Past</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4} sm={1}>
              <IconButton color='primary' onClick={handleRefresh} size='large'>
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>

        {/* --- 3. Stats Chips --- */}
        <Box display='flex' gap={1.5} mb={3}>
          <Chip label={`Total Events: ${totalEvents}`} variant='outlined' color='primary' />
          <Chip label={`Current Page: ${currentPage}`} variant='outlined' color='primary' />
          <Chip label={`Total Pages: ${totalPages}`} variant='outlined' color='primary' />
        </Box>

        {/* --- 4. Event List --- */}
        {paginatedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}

        {paginatedEvents.length === 0 && (
          <Card elevation={1} sx={{ p: 5, textAlign: 'center', color: 'text.secondary', borderRadius: 2 }}>
            <Typography>No events found based on the current filters.</Typography>
          </Card>
        )}

        {/* --- 5. Pagination --- */}
        <Paper
          elevation={1}
          sx={{ p: 2, mt: 3, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant='body2' color='text.secondary'>
            Page {currentPage} of {totalPages} ({totalItems} total)
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color='primary'
            size='medium'
          />
        </Paper>
      </Container>
    </Box>
  )
}

export default EventsManagementMUI
