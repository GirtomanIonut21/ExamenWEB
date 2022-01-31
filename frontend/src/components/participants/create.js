import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../config'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [error, setError] = useState('');

  const postData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/participants`, {
        name,
        meetingId,
      });
      console.log(response)
      navigate('/participants')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <h2>Create participant</h2>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input placeholder='Name' onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Meeting</InputLabel>
            <Input placeholder='Meeting' onChange={(e) => setMeetingId(e.target.value)} />
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

export default Create;