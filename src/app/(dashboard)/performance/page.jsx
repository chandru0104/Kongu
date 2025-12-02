// components/StudentPerformanceCardList.jsx
'use client'

import React, { useState, useMemo } from 'react'

import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Chip,
  Card,
  IconButton,
  Paper,
  useTheme,
  TextField,
  InputAdornment,
  Pagination,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  LinearProgress
} from '@mui/material'

import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Assessment as PerformanceIcon,
  Email as EmailIcon,
  Call as PhoneIcon,
  SupervisorAccount as RoleIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material'

// =======================================================
// 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// =======================================================

// மாதிரி மாணவர் தரவு (Only STUDENT role included) - மதிப்பெண்களுடன் புதுப்பிக்கப்பட்டுள்ளது
const initialStudentMembers = [
  {
    id: 1,
    name: 'KARTHIK S',
    email: 'karthik@school.com',
    phone: '9444158299',
    role: 'STUDENT',
    grade: 'Grade 10',
    performance: 'A+',
    scores: { Tamil: 95, English: 90, Maths: 98, Science: 92, SocScience: 91 } // 🆕 New Score Data
  },
  {
    id: 2,
    name: 'PRIYA M',
    email: 'priya@school.com',
    phone: '9940176321',
    role: 'STUDENT',
    grade: 'Grade 9',
    performance: 'B',
    scores: { Tamil: 75, English: 65, Maths: 80, Science: 70, SocScience: 78 }
  },
  {
    id: 3,
    name: 'ARAVIND G',
    email: 'aravind@school.com',
    phone: '9842234567',
    role: 'STUDENT',
    grade: 'Grade 10',
    performance: 'A',
    scores: { Tamil: 88, English: 82, Maths: 90, Science: 85, SocScience: 87 }
  },
  {
    id: 4,
    name: 'DIVYA P',
    email: 'divya@school.com',
    phone: '9654321098',
    role: 'STUDENT',
    grade: 'Grade 9',
    performance: 'C',
    scores: { Tamil: 60, English: 55, Maths: 45, Science: 62, SocScience: 58 }
  },
  {
    id: 5,
    name: 'VIVEK V',
    email: 'vivek@school.com',
    phone: '9123456789',
    role: 'STUDENT',
    grade: 'Grade 11',
    performance: 'A+',
    scores: { Tamil: 99, English: 97, Maths: 96, Science: 95, SocScience: 98 }
  },
  {
    id: 6,
    name: 'ANITA A',
    email: 'anita@school.com',
    phone: '9555544444',
    role: 'STUDENT',
    grade: 'Grade 12',
    performance: 'B+',
    scores: { Tamil: 85, English: 78, Maths: 88, Science: 82, SocScience: 80 }
  },

  // நிரப்புவதற்காக

  ...Array(54)
    .fill(null)
    .map((_, i) => {
      const scores = {
        Tamil: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
        English: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
        Maths: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
        Science: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
        SocScience: Math.floor(Math.random() * (100 - 40 + 1)) + 40
      }

      const avg = (scores.Tamil + scores.English + scores.Maths + scores.Science + scores.SocScience) / 5
      let performance

      if (avg >= 90) performance = 'A+'
      else if (avg >= 80) performance = 'A'
      else if (avg >= 70) performance = 'B+'
      else if (avg >= 60) performance = 'B'
      else performance = 'C'

      return {
        id: 7 + i,
        name: `STUDENT ${7 + i}`,
        email: `student${7 + i}@school.com`,
        phone: `9${String(Math.floor(Math.random() * 900000000) + 100000000).substring(0, 9)}`,
        role: 'STUDENT',
        grade: `Grade ${10 + (i % 3)}`,
        performance,
        scores
      }
    })
]

const totalMembers = initialStudentMembers.length
const ITEMS_PER_PAGE = 8
const SUBJECTS = ['Tamil', 'English', 'Maths', 'Science', 'SocScience'] // 5 Major TN Subjects

// =======================================================
// 🔨 Student Summary Card Component (Existing)
// =======================================================

const StudentSummaryCard = ({ title, count, type }) => {
  const theme = useTheme()

  // Simplified iconMap for Students/Performance
  const iconMap = {
    total: { icon: <GroupIcon />, color: theme.palette.info.main },
    STUDENT: { icon: <PeopleIcon />, color: theme.palette.primary.main },
    performance: { icon: <PerformanceIcon />, color: theme.palette.warning.main }
  }

  const currentIcon = iconMap[type]

  if (!currentIcon) return null

  return (
    <Card elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
      <Box sx={{ p: 3 }}>
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '50%',
                backgroundColor: currentIcon.color,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {React.cloneElement(currentIcon.icon, { sx: { fontSize: 30 } })}
            </Box>
          </Grid>
          <Grid item>
            <Typography variant='body2' color='text.secondary' sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              {title}
            </Typography>
            <Typography variant='h3' component='div' fontWeight='bold' sx={{ color: currentIcon.color }}>
              {count}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

// =======================================================
// 🎨 Performance Chip Styling (Existing)
// =======================================================
const getPerformanceChip = (score, theme) => {
  let colorName

  switch (score) {
    case 'A+':
    case 'A':
      colorName = 'success'
      break
    case 'B+':
    case 'B':
      colorName = 'warning'
      break
    case 'C':
    default:
      colorName = 'error'
      break
  }

  return <Chip label={score} size='medium' color={colorName} sx={{ fontWeight: 'bold' }} />
}

// =======================================================
// 🔨 Student Card Item Component (Updated with onClick)
// =======================================================
const StudentListItem = ({ student, onClick }) => {
  // 🆕 Added onClick prop
  const theme = useTheme()
  const initials = student.name ? student.name[0] : 'S'

  let avatarColor = theme.palette.primary.main

  return (
    <Card
      elevation={1}
      onClick={() => onClick(student)} // 🆕 Handle Click
      sx={{
        mb: 2,
        borderRadius: 2,
        p: 2,
        cursor: 'pointer', // 🆕 Add pointer cursor
        transition: 'background-color 0.3s, box-shadow 0.3s',
        border: '1px solid #eee',
        '&:hover': {
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.action.hover
        }
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box display='flex' alignItems='center' flexGrow={1}>
          <Avatar
            sx={{
              bgcolor: avatarColor,
              mr: 2,
              width: 45,
              height: 45,
              fontSize: '1.4rem',
              fontWeight: 'bold'
            }}
          >
            {initials}
          </Avatar>

          <Box>
            <Typography variant='h6' fontWeight='bold' sx={{ textTransform: 'uppercase', lineHeight: 1 }}>
              {student.name}
            </Typography>
            <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ mt: 0.5 }}>
              {/* Email */}
              <Typography variant='body2' color='text.secondary' sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                {student.email}
              </Typography>
              {/* Phone */}
              <Typography variant='body2' color='text.secondary' sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                {student.phone}
              </Typography>
              {/* Grade/Role */}
              <Typography
                variant='body2'
                fontWeight='medium'
                sx={{ color: theme.palette.text.primary, mr: 3, display: 'flex', alignItems: 'center' }}
              >
                <RoleIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                Grade: {student.grade}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Performance Score (Replaced Actions) */}
        <Box textAlign='right' display='flex' alignItems='center'>
          <Box sx={{ mr: 1 }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
              Score
            </Typography>
            {getPerformanceChip(student.performance, theme)}
          </Box>
          <ChevronRightIcon color='action' /> {/* 🆕 Arrow to indicate clickability */}
        </Box>
      </Box>
    </Card>
  )
}

// =======================================================
// 🆕 Student Performance Dialog Component (Final Color Update)
// =======================================================
const StudentPerformanceDialog = ({ student, open, onClose }) => {
  const theme = useTheme()

  if (!student || !student.scores) return null

  // Calculate Summary Data
  const scores = student.scores
  const subjectEntries = Object.entries(scores)
  const totalScore = subjectEntries.reduce((sum, [, score]) => sum + score, 0)
  const averageScore = totalScore / SUBJECTS.length

  // Find Strongest and Weakest Subjects

  const bestSubject = subjectEntries.reduce((best, [name, score]) => (score > best.score ? { name, score } : best), {
    name: '',
    score: -1
  })

  const worstSubject = subjectEntries.reduce(
    (worst, [name, score]) => (score < worst.score ? { name, score } : worst),
    { name: '', score: 101 }
  )

  // Performance Color for Score Text - 🆕 Harmonized and Softer Colors

  const getScoreColor = score => {
    // Using light/soft hex codes for text consistency with the progress bar
    if (score >= 90) return '#66bb6a' // Light Green
    if (score >= 75) return '#ffb74d' // Light Orange

    return '#ef5350' // Light Red
  }

  // Bar Color Function for lighter look (used for LinearProgress)
  const getBarColor = score => {
    // Keeping slightly lighter hex codes for the bar
    if (score >= 90) return '#66bb6a' // light green
    if (score >= 75) return '#ffb74d' // light orange

    return '#ef5350' // light red
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5' fontWeight='bold' color='primary.main'>
          {student.name}&apos;s Academic Performance
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent dividers>
        <Grid container spacing={4}>
          {/* 1. Student Info & Overall Summary - Light Color */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: '1px solid ' + theme.palette.grey[300],
                bgcolor: theme.palette.common.white
              }}
            >
              <Grid container spacing={3} alignItems='center'>
                <Grid item>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main, fontSize: '1.8rem' }}>
                    {student.name[0]}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant='h6' fontWeight='medium'>
                    {student.grade} - Overall Performance:{getPerformanceChip(student.performance, theme)}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    Average Score:{averageScore.toFixed(1)} / 100 | Total Score: {totalScore} / {SUBJECTS.length * 100}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* 2. Strongest & Weakest Subjects - Light Color */}
          <Grid item xs={12} sm={6}>
            <Card
              elevation={2}
              sx={{
                p: 2,
                bgcolor: '#e8f5e9', // Lighter Green
                border: '1px solid ' + theme.palette.success.light
              }}
            >
              <Box display='flex' alignItems='center' mb={1}>
                <TrendingUpIcon color='success' sx={{ mr: 1 }} />
                <Typography variant='h6' fontWeight='bold' color='success.dark'>
                  Strongest Subject
                </Typography>
              </Box>
              <Typography variant='h4' fontWeight='bold' color='success.main'>
                {bestSubject.name}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Score:{bestSubject.score} / 100
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              elevation={2}
              sx={{
                p: 2,
                bgcolor: '#ffebee', // Lighter Red
                border: '1px solid ' + theme.palette.error.light
              }}
            >
              <Box display='flex' alignItems='center' mb={1}>
                <TrendingDownIcon color='error' sx={{ mr: 1 }} />
                <Typography variant='h6' fontWeight='bold' color='error.dark'>
                  Weakest Subject
                </Typography>
              </Box>
              <Typography variant='h4' fontWeight='bold' color='error.main'>
                {worstSubject.name}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Score: {worstSubject.score} / 100
              </Typography>
            </Card>
          </Grid>

          {/* 3. Subject-wise Score Breakdown - Light Color Progress Bar & Text */}
          <Grid item xs={12}>
            <Typography variant='h6' component='h3' fontWeight='bold' sx={{ mb: 2 }}>
              Subject-wise Breakdown (Out of 100)
            </Typography>
            {SUBJECTS.map(subject => (
              <Box key={subject} sx={{ mb: 2 }}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1' fontWeight='medium'>
                    {subject}
                  </Typography>
                  {/* 🆕 Using getScoreColor for Typography color (now harmonized and lighter) */}
                  <Typography variant='body1' fontWeight='bold' sx={{ color: getScoreColor(scores[subject]) }}>
                    {scores[subject]}
                  </Typography>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={scores[subject]}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getBarColor(scores[subject])
                    }
                  }}
                />
              </Box>
            ))}
          </Grid>

          {/* 4. Improvement Suggestion - Light Color */}
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#e3f2fd', // Lighter Blue
                border: '1px solid ' + theme.palette.info.light,
                borderRadius: 2
              }}
            >
              <Typography variant='h6' fontWeight='bold' color='info.dark'>
                💡 Improvement Focus
              </Typography>
              <Typography variant='body1'>
                The student&apos;s lowest score is in {worstSubject.name} with {worstSubject.score}. Focused study and
                additional practice in this area are recommended to improve the overall percentage.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='primary' variant='contained'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// =======================================================
// ⭐ முக்கிய Student Performance Component (No Change)
// =======================================================
const StudentPerformanceCardList = () => {
  const theme = useTheme()

  const [searchTerm, setSearchTerm] = useState('')
  const [inputTerm, setInputTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [studentMembers] = useState(initialStudentMembers)

  // 🆕 Dialog State
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // 🆕 Handlers for Dialog
  const handleStudentClick = student => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedStudent(null)
  }

  // Summary Data Calculation (Existing)
  const totalStudents = studentMembers.length
  const highPerformers = studentMembers.filter(s => s.performance === 'A+' || s.performance === 'A').length

  const summaryData = [
    { title: 'Total Students', count: totalStudents, type: 'total' },
    { title: 'High Performers (A/A+)', count: highPerformers, type: 'performance' },
    { title: 'Currently Active', count: totalStudents, type: 'STUDENT' }
  ]

  // Search / Filtering Logic (Existing)
  const filteredStudents = useMemo(() => {
    return studentMembers.filter(
      student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.performance.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, studentMembers])

  // Pagination Logic (Existing)
  const totalFilteredMembers = filteredStudents.length
  const totalPages = Math.ceil(totalFilteredMembers / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Handlers (Existing)
  const handleSearch = () => {
    setSearchTerm(inputTerm)
    setCurrentPage(1)
  }

  const handleClear = () => {
    setInputTerm('')
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  // PageHeader Component (Existing)
  const PageHeader = () => (
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
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' alignItems='center'>
            <PerformanceIcon sx={{ mr: 1.5, fontSize: 35, color: 'primary.main' }} />
            <Box>
              <Typography variant='h5' component='h1' fontWeight='bold'>
                Student Performance
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                View student grades, contacts, and academic performance
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton color='primary' size='large'>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Paper>
  )

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <PageHeader />

      <Container maxWidth='xl' sx={{ py: 2 }}>
        {/* --- 1. Student Summary Cards --- */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {summaryData.map(data => (
            <Grid item xs={12} sm={6} md={4} key={data.title}>
              <StudentSummaryCard {...data} type={data.type} />
            </Grid>
          ))}
        </Grid>

        {/* --- 2. Search & Filter Bar --- */}
        <Card elevation={1} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
          <Typography variant='h6' gutterBottom fontWeight='bold'>
            Search and Filter Students
          </Typography>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={8} lg={9}>
              <TextField
                fullWidth
                label='Search by Name, Email, Phone, Grade, or Performance Score'
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
            <Grid item xs={12} md={4} lg={3}>
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
          Student List ({totalFilteredMembers} members)
        </Typography>

        {/* --- 3. Student Card List (View Only) --- */}
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
          {currentStudents.length > 0 ? (
            currentStudents.map(student => (
              <StudentListItem
                key={student.id}
                student={student}
                onClick={handleStudentClick} // 🆕 Pass handler
              />
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant='body1' color='text.secondary'>
                No students found matching &quot;{searchTerm}&quot;
              </Typography>
            </Box>
          )}
        </Paper>

        {/* --- 4. Pagination --- */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Showing {Math.min(startIndex + 1, totalFilteredMembers)} -{' '}
            {Math.min(startIndex + ITEMS_PER_PAGE, totalFilteredMembers)} of {totalFilteredMembers} student members
            {searchTerm && (
              <Chip label={`Filtered from ${totalMembers}`} size='small' sx={{ ml: 1, color: 'text.secondary' }} />
            )}
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
            showFirstButton
            showLastButton
            disabled={totalPages === 0}
          />
        </Box>
      </Container>

      {/* 🆕 Dialog Component */}
      <StudentPerformanceDialog student={selectedStudent} open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  )
}

export default StudentPerformanceCardList
