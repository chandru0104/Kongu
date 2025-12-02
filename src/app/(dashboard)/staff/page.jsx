// components/StaffManagementMUI.jsx or staff/page.jsx
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  TextField,
  InputAdornment,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material'

// =======================================================
// 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// =======================================================

// மாதிரி ஊழியர் தரவு (Role-களைப் பயன்படுத்தி உள்ளோம்)
const initialStaffMembers = [
  { id: 1, name: 'KAVITHA G', email: 'agalpugazh6@gmail.com', role: 'STAFF' },
  { id: 2, name: 'Prabha.M', email: 'gowshyavenkatesh@gmail.com', role: 'STAFF' },
  { id: 3, name: 'Malathi.M', email: 'malathimalathi04796@gmail.com', role: 'STAFF' },
  { id: 4, name: 'Arun.S', email: 'aruns@company.com', role: 'STAFF' },
  { id: 5, name: 'Priya R', email: 'priyar@company.com', role: 'STAFF' },
  { id: 6, name: 'Gopal K', email: 'gopalk@company.com', role: 'STAFF' },
  { id: 7, name: 'Deepa V', email: 'deepav@company.com', role: 'STAFF' },
  { id: 8, name: 'Suresh A', email: 'suresha@company.com', role: 'STAFF' },
  { id: 9, name: 'Vimala B', email: 'vimalab@company.com', role: 'STAFF' },
  { id: 10, name: 'Chandru M', email: 'chandrum@company.com', role: 'STAFF' },
  { id: 11, name: 'Nisha P', email: 'nishap@company.com', role: 'STAFF' },
  { id: 12, name: 'Rajesh S', email: 'rajeshs@company.com', role: 'STAFF' },
  { id: 13, name: 'Jaya P', email: 'jaya@company.com', role: 'STAFF' },
  { id: 14, name: 'Vasanth M', email: 'vasanth@company.com', role: 'STAFF' },
  { id: 15, name: 'Ganesh L', email: 'ganesh@company.com', role: 'STAFF' },
  { id: 16, name: 'Sarala K', email: 'sarala@company.com', role: 'STAFF' },
  { id: 17, name: 'Vivek M', email: 'vivek@company.com', role: 'STAFF' },
  { id: 18, name: 'Shanthi R', email: 'shanthi@company.com', role: 'STAFF' },
  { id: 19, name: 'Ravi P', email: 'ravi@company.com', role: 'ADMIN' },
  { id: 20, name: 'Anitha B', email: 'anitha@company.com', role: 'STAFF' }
]

const totalMembers = initialStaffMembers.length
const ITEMS_PER_PAGE = 8
const staffRoles = ['STAFF', 'STAFF', 'ADMIN']

// =======================================================
// 🔨 Staff Summary Card Component
// =======================================================

const StaffSummaryCard = ({ title, count, type }) => {
  const theme = useTheme()

  const iconMap = {
    total: { icon: <GroupIcon />, color: theme.palette.info.main },
    STAFF: { icon: <AdminIcon />, color: theme.palette.success.main },
    staff: { icon: <PeopleIcon />, color: theme.palette.primary.main }
  }

  const currentIcon = iconMap[type]

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
// ⭐ முக்கிய StaffManagement Component
// =======================================================
const StaffManagementMUI = () => {
  const theme = useTheme()

  const [searchTerm, setSearchTerm] = useState('')
  const [inputTerm, setInputTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [staffMembers, setStaffMembers] = useState(initialStaffMembers)

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({})

  // Summary Data Calculation
  const totalSTAFFs = staffMembers.filter(s => s.role === 'STAFF' || s.role === 'ADMIN').length
  const totalStaffOnly = staffMembers.filter(s => s.role === 'STAFF').length

  const summaryData = [
    { title: 'Total Staff Members', count: totalMembers, type: 'total' },
    { title: 'STAFFs & Admins', count: totalSTAFFs, type: 'STAFF' },
    { title: 'Operational Staff', count: totalStaffOnly, type: 'staff' }
  ]

  // Search / Filtering Logic
  const filteredStaff = useMemo(() => {
    return staffMembers.filter(
      staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, staffMembers])

  // Pagination Logic
  const totalFilteredMembers = filteredStaff.length
  const totalPages = Math.ceil(totalFilteredMembers / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentStaff = filteredStaff.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Handlers
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

  // Add Staff Button Click
  const handleCreateNew = () => {
    setIsCreating(true)
    setFormData({ name: '', email: '', role: 'STAFF' })
    setOpenDialog(true)
  }

  // Edit Button Click (Opens the same Dialog)
  const handleEditClick = row => {
    setIsCreating(false)
    setFormData(row)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setFormData({})
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveStaff = () => {
    if (isCreating) {
      const newId = staffMembers.length > 0 ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1

      const newStaff = { ...formData, id: newId }
      setStaffMembers(prev => [...prev, newStaff])
      alert(`New Staff ${newStaff.name} created!`)
    } else {
      setStaffMembers(prev => prev.map(s => (s.id === formData.id ? formData : s)))
      alert(`Staff ${formData.name} updated!`)
    }

    handleCloseDialog()
  }

  // 🎨 Role Chip Styling with Glass Effect
  const getRoleChip = role => {
    let colorName
    let icon = <PeopleIcon sx={{ fontSize: 14 }} />

    switch (role) {
      case 'ADMIN':
        colorName = 'secondary'
        icon = <AdminIcon sx={{ fontSize: 14 }} />
        break
      case 'STAFF':
        colorName = 'warning'
        icon = <GroupIcon sx={{ fontSize: 14 }} />
        break
      default:
        break
    }

    // Base color and its light variant for styling
    const baseColor = theme.palette[colorName].main
    const lightColor = theme.palette[colorName].light

    return (
      <Chip
        label={role}
        size='small'
        color={colorName}
        icon={icon}
        sx={{
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: baseColor,
          border: `1px solid ${lightColor}50`,
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      />
    )
  }

  // ------------------------------------------------------------------
  // UI Rendering
  // ------------------------------------------------------------------

  const PageHeader = ({ handleCreateNew }) => (
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
            <PeopleIcon sx={{ mr: 1.5, fontSize: 35, color: 'primary.main' }} />
            <Box>
              <Typography variant='h5' component='h1' fontWeight='bold'>
                Staff Management
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Manage school staff, roles, and contacts
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton color='primary' sx={{ mr: 1 }} size='large'>
              <RefreshIcon />
            </IconButton>
            <Button variant='contained' startIcon={<AddIcon />} size='large' onClick={handleCreateNew}>
              Add Staff
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  )

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <PageHeader handleCreateNew={handleCreateNew} />

      <Container maxWidth='xl' sx={{ py: 2 }}>
        {/* --- 1. Staff Summary Cards --- */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {summaryData.map(data => (
            <Grid item xs={12} sm={6} md={4} key={data.title}>
              <StaffSummaryCard {...data} />
            </Grid>
          ))}
        </Grid>

        <Card elevation={1} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
          <Typography variant='h6' gutterBottom fontWeight='bold'>
            Search and Filter Staff
          </Typography>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={8} lg={9}>
              <TextField
                fullWidth
                label='Search Staff by Name or Email'
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
          Staff List ({totalFilteredMembers} members)
        </Typography>

        {/* --- 3. Staff Table --- */}
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label='staff management table'>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStaff.length > 0 ? (
                currentStaff.map(row => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'background-color 0.2s',
                      '&:hover': { backgroundColor: theme.palette.action.hover }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      <Box display='flex' alignItems='center'>
                        <PeopleIcon color='action' sx={{ mr: 1, fontSize: 18 }} />
                        <Typography variant='subtitle2' fontWeight='bold' color='text.primary'>
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{getRoleChip(row.role)}</TableCell>
                    <TableCell align='center'>
                      <IconButton size='small' color='primary' onClick={() => handleEditClick(row)}>
                        <EditIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton size='small' color='error' onClick={() => alert(`Delete ${row.name}`)}>
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align='center' sx={{ py: 4 }}>
                    <Typography variant='body1' color='text.secondary'>
                      No staff found matching &quot;{searchTerm}&quot;
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- 4. Pagination --- */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Showing {Math.min(startIndex + 1, totalFilteredMembers)} -{' '}
            {Math.min(startIndex + ITEMS_PER_PAGE, totalFilteredMembers)} of {totalFilteredMembers} staff members
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

      {/* --- Edit/Create Dialog (Add Staff / Edit Staff) --- */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth sx={{ zIndex: 10000 }}>
        <DialogTitle>{isCreating ? 'Create New Staff Member' : 'Edit Staff Information'}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label='Staff Name'
            name='name'
            value={formData.name || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
            autoFocus
          />
          <TextField
            fullWidth
            label='Staff Email'
            name='email'
            type='email'
            value={formData.email || ''}
            onChange={handleInputChange}
            margin='normal'
            variant='outlined'
          />
          <FormControl fullWidth margin='normal' variant='outlined'>
            <InputLabel>Role</InputLabel>
            <Select label='Role' name='role' value={formData.role || 'STAFF'} onChange={handleInputChange}>
              {staffRoles.map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color='inherit'>
            Cancel
          </Button>
          <Button onClick={handleSaveStaff} variant='contained' color='primary'>
            {isCreating ? 'Create Staff' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default StaffManagementMUI
