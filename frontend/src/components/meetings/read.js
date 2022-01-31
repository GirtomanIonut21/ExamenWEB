import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, Container, Box, DialogActions } from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../config'
import { useParams, Link, useNavigate } from 'react-router-dom';

const Read = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [meeting, setMeeting] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
     await axios.delete(`${apiUrl}/meetings/${id}`)
     navigate('/meetings')
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      const { data } = await axios.get(`${apiUrl}/meetings/${id}`)
      const meeting = data.data;
      setMeeting(meeting)
    }
    fetchMeeting();
  }, [])

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <h2>View meeting</h2>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <h4>Description:</h4>
          {meeting.description}
        </Box>
        <Box gridColumn="span 12">
          <h4>Url:</h4>
          {meeting.url}
        </Box>
        <Box gridColumn="span 12">
          <h4>Date:</h4>
          {meeting.date}
        </Box>
        <Box gridColumn="span 12">
          <Link to={`/meetings/update/${id}`}><Button>Update</Button></Link>
         <Button onClick={handleClickOpen}>Delete</Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete meeting
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete meeting?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
}

export default Read;