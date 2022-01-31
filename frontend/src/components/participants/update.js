import React, { useState, useEffect } from 'react';
import {
  FormControl, InputLabel, Input, Button,
  Container, Box, TextField, Alert
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config'

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${apiUrl}/participants/${id}`)
      const participant = data.data;
      setName(participant.name)
      setMeetingId(participant.meetingId)
    }
    fetch();
  }, [])

  const postData = async () => {
    try {
      await axios.put(`${apiUrl}/participants/${id}`, {
        name,
        meetingId
      });
      navigate(`/participants/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <h2>Update participant</h2>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Meeting</InputLabel>
            <Input placeholder='Meeting' value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <Button type='submit' onClick={postData}>Submit</Button>

        </Box>
        <Box gridColumn="span 12">
          {error &&
            <Alert severity="error">{error}</Alert>
          }
        </Box>
      </Box>
    </Container >
  )
}

export default Update;