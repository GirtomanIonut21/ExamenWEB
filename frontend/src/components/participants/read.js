import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, Container, Box, DialogActions } from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../config'
import { useParams, Link, useNavigate } from 'react-router-dom';

const Read = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [participant, setParticipant] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
     await axios.delete(`${apiUrl}/participants/${id}`)
     navigate('/participants')
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${apiUrl}/participants/${id}`)
      const participant = data.data;
      setParticipant(participant)
    }
    fetch();
  }, [])

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <h2>View participant</h2>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <h4>Name:</h4>
          {participant.description}
        </Box>
        <Box gridColumn="span 12">
          <h4>Meeting:</h4>
          {participant.meetingId}
        </Box>
        <Box gridColumn="span 12">
          <Link to={`/participants/update/${id}`}><Button>Update</Button></Link>
         <Button onClick={handleClickOpen}>Delete</Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete participant
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete participant?
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