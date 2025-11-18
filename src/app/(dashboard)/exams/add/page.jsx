// // components/ExamListMUI.jsx
// 'use client'

// import React, { useState, useMemo } from 'react'
// import {
//   Box,
//   Typography,
//   Container,
//   Card,
//   useTheme,
//   TextField,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Divider,
//   Chip,
//   Paper,
//   IconButton,
//   Fab, // For Floating Action Button
//   Tabs,
//   Tab
// } from '@mui/material'
// import {
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   Schedule as ScheduleIcon, // For Upcoming
//   AccessTimeFilled as AccessTimeFilledIcon, // For Past
//   Menu as MenuIcon, // For All Tab
//   Refresh as RefreshIcon,
//   Add as AddIcon
// } from '@mui/icons-material'
// import { deepPurple, lightBlue, red } from '@mui/material/colors'

// // =======================================================
// // 📚 தரவு மற்றும் அமைப்புகள் (Data and Settings)
// // =======================================================

// // மாதிரி தேர்வுத் தரவு (Sample Exam Data)
// const initialExams = [
//   {
//     id: 1,
//     name: 'Midterm examination',
//     type: 'MID TERM',
//     marks: 300,
//     date: '2025-09-07',
//     time: '09:52:24',
//     status: 'Past'
//   },
//   {
//     id: 2,
//     name: 'Quarterly Examination',
//     type: 'QUARTERLY',
//     marks: 300,
//     date: '2025-09-09',
//     time: '09:51:00',
//     status: 'Past'
//   },
//   {
//     id: 3,
//     name: 'Unit Test - Chapter 5',
//     type: 'UNIT TEST',
//     marks: 50,
//     date: '2025-11-20',
//     time: '10:00:00',
//     status: 'Upcoming'
//   },
//   {
//     id: 4,
//     name: 'Annual Final Exam',
//     type: 'ANNUAL',
//     marks: 600,
//     date: '2026-03-15',
//     time: '09:00:00',
//     status: 'Upcoming'
//   }
// ]

// // வடிகட்டி சில்லு பெயர்கள் (Filter Chip Names)
// const EXAM_TYPES = [
//   'ALL',
//   'UNIT TEST',
//   'MID TERM',
//   'FINAL',
//   'QUARTERLY',
//   'HALF YEARLY',
//   'ANNUAL',
//   'MONTHLY TEST',
//   'SURPRISE TEST'
// ]

// // =======================================================
// // 🔨 Reusable Components
// // =======================================================

// /**
//  * தேர்வுப் பெயரின் முதல் எழுத்தை Avatar ஆகக் காட்டும் Component
//  */
// const ExamAvatar = ({ type }) => {
//   let bgColor
//   switch (type) {
//     case 'MID TERM':
//       bgColor = lightBlue[600]
//       break
//     case 'QUARTERLY':
//       bgColor = deepPurple[500]
//       break
//     case 'UNIT TEST':
//       bgColor = red[400]
//       break
//     default:
//       bgColor = lightBlue[600]
//   }

//   const char = type.charAt(0)

//   return (
//     <Box
//       sx={{
//         width: 40,
//         height: 40,
//         borderRadius: '50%',
//         backgroundColor: bgColor,
//         color: '#fff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontWeight: 'bold',
//         fontSize: '1.2rem'
//       }}
//     >
//       {char}
//     </Box>
//   )
//   // }

// // ------------------------------------------------------------------
// // ⭐ முக்கிய ExamListMUI Component
// // ------------------------------------------------------------------
// const ExamListMUI = ({ className = 'Trial class students' }) => {
//   const theme = useTheme()
//   const [activeTab, setActiveTab] = useState('all') // 'all', 'upcoming', 'past'
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedTypes, setSelectedTypes] = useState(['ALL'])

//   // Tab மாற்றத்திற்கான Handler
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }

//   // வடிகட்டி சில்லு மாற்றத்திற்கான Handler
//   const handleChipClick = type => {
//     if (type === 'ALL') {
//       setSelectedTypes(['ALL'])
//     } else {
//       let newSelection
//       if (selectedTypes.includes('ALL')) {
//         newSelection = [type]
//       } else if (selectedTypes.includes(type)) {
//         newSelection = selectedTypes.filter(t => t !== type)
//       } else {
//         newSelection = [...selectedTypes, type]
//       }

//       // If no chips are selected, default back to ALL
//       if (newSelection.length === 0) {
//         setSelectedTypes(['ALL'])
//       } else {
//         setSelectedTypes(newSelection)
//       }
//     }
//   }

//   // தேர்வுப் பட்டியலை வடிகட்டவும் தேடவும்
//   const filteredExams = useMemo(() => {
//     return initialExams
//       .filter(exam => {
//         // 1. Tab Filter
//         const tabMatch =
//           activeTab === 'all' ||
//           (activeTab === 'upcoming' && exam.status === 'Upcoming') ||
//           (activeTab === 'past' && exam.status === 'Past')

//         // 2. Chip (Type) Filter
//         const typeMatch =
//           selectedTypes.includes('ALL') || selectedTypes.includes(exam.type)

//         // 3. Search Filter
//         const searchMatch = exam.name.toLowerCase().includes(searchTerm.toLowerCase())

//         return tabMatch && typeMatch && searchMatch
//       })
//       .sort((a, b) => new Date(b.date) - new Date(a.date)) // தேதியின் அடிப்படையில் வரிசைப்படுத்துதல்
//   }, [activeTab, searchTerm, selectedTypes])

//   // ------------------------------------------------------------------
//   // UI Component: AppBar (படத்தின் மேல் பட்டி)
//   // ------------------------------------------------------------------
//   const AppBar = ({ className }) => (
//     <Box
//       sx={{
//         bgcolor: theme.palette.primary.main,
//         color: 'white',
//         py: 1.5,
//         px: 2,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         position: 'sticky',
//         top: 0,
//         zIndex: 100
//       }}
//     >
//       <Box display="flex" alignItems="center">
//         <IconButton sx={{ color: 'white' }} onClick={() => alert('Back')}>
//           <ChevronRightIcon sx={{ transform: 'rotate(180deg)' }} />
//         </IconButton>
//         <Typography variant="h6" fontWeight="medium">
//           Exams - {className}
//         </Typography>
//       </Box>
//       <IconButton sx={{ color: 'white' }}>
//         <RefreshIcon />
//       </IconButton>
//     </Box>
//   )

//   // ------------------------------------------------------------------
//   // UI Rendering: Main Component
//   // ------------------------------------------------------------------
//   return (
//     <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
//       {/* --- 1. App Bar --- */}
//       <AppBar className={className} />

//       {/* --- 2. Tabs --- */}
//       <Paper elevation={1} sx={{ position: 'sticky', top: 56, zIndex: 90 }}>
//         <Tabs
//           value={activeTab}
//           onChange={handleTabChange}
//           centered
//           indicatorColor="primary"
//           textColor="primary"
//           sx={{ borderBottom: 1, borderColor: 'divider' }}
//         >
//           <Tab
//             value="all"
//             label={
//               <Box display="flex" alignItems="center">
//                 <MenuIcon sx={{ mr: 0.5 }} /> All
//               </Box>
//             }
//           />
//           <Tab
//             value="upcoming"
//             label={
//               <Box display="flex" alignItems="center">
//                 <ScheduleIcon sx={{ mr: 0.5 }} /> Upcoming
//               </Box>
//             }
//           />
//           <Tab
//             value="past"
//             label={
//               <Box display="flex" alignItems="center">
//                 <AccessTimeFilledIcon sx={{ mr: 0.5 }} /> Past
//               </Box>
//             }
//           />
//         </Tabs>
//       </Paper>

//       <Container maxWidth="lg" sx={{ pt: 2, pb: 10 }}>
//         {/* --- 3. Search Bar --- */}
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search exams..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           sx={{ mb: 2, bgcolor: 'white' }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//             sx: { borderRadius: 2 }
//           }}
//         />

//         {/* --- 4. Filter Chips --- */}
//         <Box sx={{ mb: 3, overflowX: 'auto', whiteSpace: 'nowrap', '&::-webkit-scrollbar': { display: 'none' } }}>
//           {EXAM_TYPES.map(type => (
//             <Chip
//               key={type}
//               label={type}
//               onClick={() => handleChipClick(type)}
//               color={selectedTypes.includes(type) ? 'primary' : 'default'}
//               variant={selectedTypes.includes(type) ? 'filled' : 'outlined'}
//               sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
//             />
//           ))}
//         </Box>

//         {/* --- 5. Exam List --- */}
//         <Card elevation={2} sx={{ borderRadius: 2 }}>
//           <List disablePadding>
//             {filteredExams.length > 0 ? (
//               filteredExams.map((exam, index) => (
//                 <React.Fragment key={exam.id}>
//                   <ListItem
//                     secondaryAction={
//                       <IconButton edge="end" aria-label="delete" sx={{ color: red[500] }} onClick={() => alert(`Deleting ${exam.name}`)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     }
//                     onClick={() => alert(`View details for: ${exam.name}`)}
//                     sx={{
//                       py: 2,
//                       cursor: 'pointer',
//                       transition: 'background-color 0.15s',
//                       '&:hover': { backgroundColor: theme.palette.action.hover }
//                     }}
//                   >
//                     <ListItemIcon sx={{ minWidth: 50 }}>
//                       <ExamAvatar type={exam.type} />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={
//                         <Typography variant="subtitle1" fontWeight="bold">
//                           {exam.name}
//                         </Typography>
//                       }
//                       secondary={
//                         <Box component="span">
//                           <Typography component="span" variant="body2" color="text.primary" fontWeight="medium">
//                             {exam.type} - {exam.marks} marks
//                           </Typography>
//                           <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
//                             {exam.date} {exam.time}
//                           </Typography>
//                         </Box>
//                       }
//                     />
//                   </ListItem>
//                   {index < filteredExams.length - 1 && <Divider component="li" />}
//                 </React.Fragment>
//               ))
//             ) : (
//               <ListItem>
//                 <ListItemText sx={{ textAlign: 'center', py: 3 }} primary={<Typography variant="body1" color="text.secondary">No exams found.</Typography>} />
//               </ListItem>
//             )}
//           </List>
//         </Card>
//       </Container>

//       {/* --- 6. Floating Action Button (Add Exam) --- */}
//       <Fab
//         color="primary"
//         aria-label="add"
//         sx={{
//           position: 'fixed',
//           bottom: 16,
//           right: 16,
//         }}
//         onClick={() => alert('Open New Exam Creation Form')}
//       >
//         <AddIcon />
//       </Fab>
//     </Box>
//   )
// }

// export default ExamListMUI