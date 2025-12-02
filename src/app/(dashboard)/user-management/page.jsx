'use client' // Client component directive

import React, { useState } from 'react'

import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Chip,
  Card,
  CardContent,
  IconButton,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'

import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  Update as UpdateIcon,
  List as ListIcon,
  Apps as AppsIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material'

// -----------------------------
// Sample Data
// -----------------------------
const summaryData = [
  { title: 'Total Classes', count: 40, type: 'classes' },
  { title: 'Total Students', count: 1111, type: 'students' },
  { title: 'Total Staff', count: 686, type: 'staff' }
]

const classData = [
  {
    id: 1,
    className: 'Trial Class Students',
    students: 15,
    staff: 2,
    createdDate: '6 Aug 2025',
    updatedDate: '14 Nov 2025'
  },
  { id: 2, className: 'XII CD', students: 27, staff: 26, createdDate: '6 Aug 2025', updatedDate: '18 Oct 2025' },
  { id: 3, className: 'XII AB Girls', students: 21, staff: 23, createdDate: '6 Aug 2025', updatedDate: '9 Nov 2025' },
  { id: 4, className: 'XII AB Boys', students: 29, staff: 24, createdDate: '6 Aug 2025', updatedDate: null },
  { id: 5, className: 'XI CD', students: 27, staff: 27, createdDate: '6 Aug 2025', updatedDate: null },
  {
    id: 6,
    className: 'XI AB NON NEET',
    students: 31,
    staff: 28,
    createdDate: '6 Aug 2025',
    updatedDate: '14 Nov 2025'
  },
  {
    id: 7,
    className: 'XI EFG (NEET Prep)',
    students: 35,
    staff: 30,
    createdDate: '10 Sep 2025',
    updatedDate: '12 Nov 2025'
  },
  { id: 8, className: 'X A', students: 40, staff: 18, createdDate: '1 Aug 2025', updatedDate: '10 Nov 2025' },
  { id: 9, className: 'X B', students: 38, staff: 17, createdDate: '1 Aug 2025', updatedDate: '5 Oct 2025' },
  { id: 10, className: 'IX Combined', students: 50, staff: 20, createdDate: '1 Aug 2025', updatedDate: null },
  {
    id: 11,
    className: 'VIII Science Club',
    students: 12,
    staff: 5,
    createdDate: '20 Sep 2025',
    updatedDate: '13 Nov 2025'
  },
  { id: 12, className: 'VII A', students: 42, staff: 15, createdDate: '1 Aug 2025', updatedDate: '11 Oct 2025' },
  { id: 13, className: 'VI B', students: 45, staff: 16, createdDate: '1 Aug 2025', updatedDate: '14 Nov 2025' },
  { id: 14, className: 'Class V - EVS Focus', students: 33, staff: 10, createdDate: '5 Aug 2025', updatedDate: null },
  {
    id: 15,
    className: 'Advanced Robotics Workshop',
    students: 8,
    staff: 3,
    createdDate: '1 Nov 2025',
    updatedDate: '14 Nov 2025'
  },
  { id: 16, className: 'IV C', students: 30, staff: 8, createdDate: '1 Aug 2025', updatedDate: '2 Nov 2025' },
  { id: 17, className: 'III A & B', students: 55, staff: 12, createdDate: '1 Aug 2025', updatedDate: '14 Nov 2025' },
  { id: 18, className: 'II Art Workshop', students: 20, staff: 4, createdDate: '1 Oct 2025', updatedDate: null },
  {
    id: 19,
    className: 'I Standard Math',
    students: 32,
    staff: 7,
    createdDate: '1 Aug 2025',
    updatedDate: '1 Nov 2025'
  },
  { id: 20, className: 'KG Senior', students: 40, staff: 15, createdDate: '1 Aug 2025', updatedDate: null },
  {
    id: 21,
    className: 'Primary Language Club',
    students: 25,
    staff: 6,
    createdDate: '15 Sep 2025',
    updatedDate: '13 Nov 2025'
  },
  {
    id: 22,
    className: 'HSC Commerce Stream',
    students: 45,
    staff: 25,
    createdDate: '1 Aug 2025',
    updatedDate: '10 Nov 2025'
  },
  {
    id: 23,
    className: 'HSC Science Stream',
    students: 48,
    staff: 27,
    createdDate: '1 Aug 2025',
    updatedDate: '14 Nov 2025'
  },
  { id: 24, className: 'After School Coding', students: 18, staff: 3, createdDate: '1 Oct 2025', updatedDate: null },
  {
    id: 25,
    className: 'Special Education Needs (SEN)',
    students: 10,
    staff: 5,
    createdDate: '10 Aug 2025',
    updatedDate: '12 Nov 2025'
  }
]

// -----------------------------
// Helper: Status Chip
// -----------------------------
const getStatusChip = updatedDate => {
  if (!updatedDate) {
    return (
      <Chip
        label='No Recent Update'
        size='small'
        color='default'
        variant='outlined'
        icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
      />
    )
  }

  const today = new Date('14 Nov 2025')
  const update = new Date(updatedDate)
  const diffTime = Math.abs(today - update)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 7) {
    return (
      <Chip label='Active (Last 7 Days)' size='small' color='success' icon={<UpdateIcon sx={{ fontSize: 14 }} />} />
    )
  } else if (diffDays <= 30) {
    return (
      <Chip
        label='Updated This Month'
        size='small'
        color='warning'
        variant='outlined'
        icon={<UpdateIcon sx={{ fontSize: 14 }} />}
      />
    )
  } else {
    return (
      <Chip
        label={`Updated ${updatedDate}`}
        size='small'
        color='default'
        variant='outlined'
        icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
      />
    )
  }
}

// -----------------------------
// SummaryCard Component
// -----------------------------
const SummaryCard = ({ title, count, type }) => {
  const theme = useTheme()

  const iconMap = {
    classes: { icon: <DescriptionIcon />, color: theme.palette.primary.main },
    students: { icon: <PeopleIcon />, color: theme.palette.info.main },
    staff: { icon: <GroupIcon />, color: theme.palette.success.main }
  }

  const currentIcon = iconMap[type]

  return (
    <Card elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
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

// -----------------------------
// ClassDetailCard Component
// -----------------------------
const ClassDetailCard = ({ className, students, staff, createdDate, updatedDate, handleEditClick, id }) => {
  const isTrial = className.includes('Trial')
  const StatusChip = getStatusChip(updatedDate)

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        borderLeft: isTrial ? '6px solid' : '1px solid',
        borderColor: isTrial ? 'primary.main' : 'divider',
        height: '100%',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 6 }
      }}
    >
      <CardContent>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' mb={1}>
          <Typography
            variant='subtitle1'
            component='div'
            fontWeight='bold'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <DescriptionIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
            {className}
          </Typography>
          <IconButton
            size='small'
            color='primary'
            onClick={() => handleEditClick({ id, className, students, staff, createdDate, updatedDate })}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Chip
              icon={<PeopleIcon />}
              label={`${students} Students`}
              color='info'
              variant='outlined'
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Chip
              icon={<GroupIcon />}
              label={`${staff} Staff`}
              color='success'
              variant='outlined'
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='caption' color='text.secondary'>
            Created: {createdDate}
          </Typography>
          {StatusChip}
        </Box>
      </CardContent>
    </Card>
  )
}

// -----------------------------
// Main Page Component
// -----------------------------
const ClassManagementPage = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({})

  const handleViewChange = (event, newValue) => {
    if (newValue !== null) setViewMode(newValue)
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditData(null)
    setFormData({
      className: '',
      students: '',
      staff: '',
      createdDate: new Date()
        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        .replace(/\s/g, ' '),
      updatedDate: ''
    })
    setOpenDialog(true)
  }

  const handleEditClick = row => {
    setEditData(row)
    setFormData({
      className: row.className,
      students: row.students,
      staff: row.staff,
      createdDate: row.createdDate,
      updatedDate: row.updatedDate || ''
    })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditData(null)
    setIsCreating(false)
    setFormData({})
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    if (isCreating) console.log('Creating new class:', formData)
    else console.log('Saving changes:', formData)
    handleCloseDialog()
  }

  // -----------------------------
  // Page Header Component
  // -----------------------------
  const PageHeader = () => (
    <Paper
      elevation={2}
      sx={{ position: 'sticky', top: 0, zIndex: 1000, p: 2, mb: 4, borderRadius: 0, borderBottom: '1px solid #eee' }}
    >
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' alignItems='center'>
            <DescriptionIcon sx={{ mr: 1.5, fontSize: 35, color: 'primary.main' }} />
            <Box>
              <Typography variant='h5' component='h1' fontWeight='bold'>
                Class Management
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Manage classes, student enrollment, and staff assignments
              </Typography>
            </Box>
          </Box>

          <Box>
            <IconButton color='primary' sx={{ mr: 1 }} size='large'>
              <RefreshIcon />
            </IconButton>
            <Button variant='contained' startIcon={<AddIcon />} size='large' onClick={handleCreateNew}>
              Create New Class
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  )

  // -----------------------------
  // Class Table Component
  // -----------------------------
  const ClassTable = () => (
    <TableContainer component={Paper} elevation={1}>
      <Table sx={{ minWidth: 650 }} aria-label='class management table'>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'action.hover' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Class Name</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              Students
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              Staff
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell align='center' sx={{ fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classData.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                transition: 'background-color 0.2s',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <TableCell component='th' scope='row'>
                <Box display='flex' alignItems='center'>
                  <DescriptionIcon color='action' sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant='subtitle2' fontWeight='medium'>
                    {row.className}
                  </Typography>
                  {row.className.includes('Trial') && (
                    <Chip label='Trial' size='small' color='primary' sx={{ ml: 1 }} />
                  )}
                </Box>
              </TableCell>
              <TableCell align='right'>{row.students}</TableCell>
              <TableCell align='right'>{row.staff}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>{getStatusChip(row.updatedDate)}</TableCell>
              <TableCell align='center'>
                <IconButton size='small' color='primary' onClick={() => handleEditClick(row)}>
                  <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <PageHeader />

      <Container maxWidth='xl' sx={{ py: 2 }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {summaryData.map(data => (
            <Grid item xs={12} sm={4} key={data.title}>
              <SummaryCard {...data} />
            </Grid>
          ))}
        </Grid>

        <Typography variant='h5' component='h2' fontWeight='bold' sx={{ mb: 2 }}>
          Class Details ({classData.length} classes)
        </Typography>

        <Box display='flex' justifyContent='flex-end' sx={{ mb: 3 }}>
          <Tabs value={viewMode} onChange={handleViewChange} aria-label='class view mode tabs' indicatorColor='primary'>
            <Tab icon={<AppsIcon />} value='grid' label='Card View' />
            <Tab icon={<ListIcon />} value='table' label='Table View' />
          </Tabs>
        </Box>

        {viewMode === 'grid' && (
          <Grid container spacing={3}>
            {classData.map(data => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
                <ClassDetailCard {...data} handleEditClick={handleEditClick} />
              </Grid>
            ))}
          </Grid>
        )}

        {viewMode === 'table' && <ClassTable />}
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth sx={{ zIndex: 10000 }}>
        <DialogTitle>{isCreating ? 'Create New Class' : 'Edit Class Information'}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label='Class Name'
            name='className'
            value={formData.className || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Number of Students'
            name='students'
            type='number'
            value={formData.students || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Number of Staff'
            name='staff'
            type='number'
            value={formData.staff || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Created Date'
            name='createdDate'
            value={formData.createdDate || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
            disabled
          />
          <TextField
            fullWidth
            label='Updated Date'
            name='updatedDate'
            value={formData.updatedDate || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color='inherit'>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} variant='contained' color='primary'>
            {isCreating ? 'Create Class' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClassManagementPage
