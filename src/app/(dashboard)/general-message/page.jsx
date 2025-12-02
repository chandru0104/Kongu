// components/GeneralMessagesMUI.jsx
'use client'

import React, { useState } from 'react'

import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  useTheme,
  TextField,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Checkbox
} from '@mui/material'

import {
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  PeopleAlt as PeopleAltIcon,
  Send as SendIcon
} from '@mui/icons-material'

// =======================================================
// =======================================================
// 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// =======================================================

// மாதிரி வகுப்பு தரவு (Sample Class Data)
const sampleClasses = [
  { id: 1, name: 'Trial class students' },
  { id: 2, name: 'XII CD' },
  { id: 3, name: 'XII AB Girls' },
  { id: 4, name: 'XI AB NEET' },
  { id: 5, name: 'X A1' }
]

// ------------------------------------------------------------------
// ⭐ முக்கிய GeneralMessagesMUI Component
// ------------------------------------------------------------------
const GeneralMessagesMUI = () => {
  const theme = useTheme()

  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationBody, setNotificationBody] = useState('')
  const [recipientType, setRecipientType] = useState('All Users') // 'All Users', 'Staff', 'Specific Classes'
  const [selectedClasses, setSelectedClasses] = useState([])

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationBody) {
      alert('Please fill in the Title and Body before sending.')

      return
    }

    console.log({
      title: notificationTitle,
      body: notificationBody,
      recipients: recipientType
    })

    alert(`Notification Sent! Title: ${notificationTitle} | Recipients: ${recipientType}`)
  }

  const handleClassToggle = className => {
    setSelectedClasses(prev =>
      prev.includes(className) ? prev.filter(name => name !== className) : [...prev, className]
    )
  }

  // ------------------------------------------------------------------
  // UI Component: Notification Details Card
  // ------------------------------------------------------------------
  const NotificationDetailsCard = () => (
    <Card elevation={1} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
      <Box display='flex' alignItems='center' mb={2}>
        <MessageIcon color='primary' sx={{ mr: 1 }} />
        <Typography variant='h6' fontWeight='bold' color='text.primary'>
          Notification Details
        </Typography>
      </Box>

      {/* Notification Title */}
      <TextField
        fullWidth
        label='Notification Title *'
        variant='outlined'
        size='large'
        margin='normal'
        value={notificationTitle}
        onChange={e => setNotificationTitle(e.target.value)}
        inputProps={{ maxLength: 100 }}
        InputProps={{
          startAdornment: (
            <Box sx={{ borderRight: '1px solid #ccc', pr: 1, mr: 1 }}>
              <Typography variant='body1' fontWeight='bold'>
                T
              </Typography>
            </Box>
          )
        }}
        helperText={`${notificationTitle.length}/100`}
      />

      {/* Notification Body */}
      <TextField
        fullWidth
        label='Notification Body *'
        variant='outlined'
        multiline
        rows={5}
        margin='normal'
        value={notificationBody}
        onChange={e => setNotificationBody(e.target.value)}
        inputProps={{ maxLength: 500 }}
        InputProps={{
          startAdornment: (
            <Box sx={{ alignSelf: 'flex-start', borderRight: '1px solid #ccc', pr: 1, pt: 1, mr: 1 }}>
              <Typography variant='body1' fontWeight='bold'>
                📄
              </Typography>
            </Box>
          )
        }}
        helperText={`${notificationBody.length}/500`}
      />
    </Card>
  )

  // ------------------------------------------------------------------
  // UI Component: Select Recipients Card
  // ------------------------------------------------------------------
  const SelectRecipientsCard = () => (
    <Card elevation={1} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
      <Box display='flex' alignItems='center' mb={3}>
        <PeopleAltIcon color='primary' sx={{ mr: 1 }} />
        <Typography variant='h6' fontWeight='bold' color='text.primary'>
          Select Recipients
        </Typography>
      </Box>

      <FormControl component='fieldset' fullWidth>
        <RadioGroup
          name='recipient-type'
          value={recipientType}
          onChange={e => {
            setRecipientType(e.target.value)

            // Clear specific classes if switching away from that mode
            if (e.target.value !== 'Specific Classes') {
              setSelectedClasses([])
            }
          }}
        >
          {/* Option 1: All Users */}
          <FormControlLabel
            value='All Users'
            control={<Radio />}
            label={
              <Box>
                <Typography variant='subtitle1' fontWeight='medium'>
                  Send to All Users
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Send notification to all users in the system
                </Typography>
              </Box>
            }
            sx={{ mb: 2 }}
          />

          {/* Option 2: Staff */}
          <FormControlLabel
            value='Staff'
            control={<Radio />}
            label={
              <Box>
                <Typography variant='subtitle1' fontWeight='medium'>
                  Send to Staff
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Send notification to all staff members
                </Typography>
              </Box>
            }
            sx={{ mb: 2 }}
          />

          {/* Option 3: Specific Classes (using Checkbox/Select for class choice) */}
          <FormControlLabel
            value='Specific Classes'
            control={<Radio />}
            label={
              <Box>
                <Typography variant='subtitle1' fontWeight='medium'>
                  Send to Specific Classes
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Select individual classes to receive the notification
                </Typography>
              </Box>
            }
            sx={{ mb: 2 }}
          />
        </RadioGroup>
        {/* Class Selector Dropdown/Checkboxes (Visible only for &apos;Specific Classes&apos;) */}
        <Paper variant='outlined' sx={{ p: 2, mt: 2, ml: 4 }}>
          <Typography variant='subtitle2' gutterBottom fontWeight='bold'>
            Choose Classes:
          </Typography>
          <Grid container spacing={1}>
            {sampleClasses.map(classItem => (
              <Grid item key={classItem.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedClasses.includes(classItem.name)}
                      onChange={() => handleClassToggle(classItem.name)}
                      name={classItem.name}
                      color='primary'
                      size='small'
                    />
                  }
                  label={<Typography variant='body2'>{classItem.name}</Typography>}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </FormControl>
    </Card>
  )

  // ------------------------------------------------------------------
  // UI Rendering: Main Component
  // ------------------------------------------------------------------
  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', py: 4 }}>
      <Container maxWidth='md'>
        {/* --- Page Header --- */}
        <Box display='flex' alignItems='center' mb={4}>
          <NotificationsIcon sx={{ mr: 2, fontSize: 35, color: 'primary.main' }} />
          <Box>
            <Typography variant='h5' component='h1' fontWeight='bold'>
              General Messages
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Send notifications to all users or specific classes
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* --- 1. Notification Details --- */}
        <NotificationDetailsCard />

        {/* --- 2. Select Recipients --- */}
        <SelectRecipientsCard />

        <Divider sx={{ mt: 4, mb: 4 }} />

        {/* --- 3. Action Button --- */}
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<SendIcon />}
            size='large'
            onClick={handleSendNotification}
            disabled={
              !notificationTitle ||
              !notificationBody ||
              (recipientType === 'Specific Classes' && selectedClasses.length === 0)
            }
          >
            Send Notification
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default GeneralMessagesMUI
