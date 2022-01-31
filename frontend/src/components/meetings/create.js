import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, TextField, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../config'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const postData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/meetings`, {
        description,
        url,
        date
      });
      console.log(response)
      navigate('/meetings')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <h2>Create meeting</h2>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Description</InputLabel>
            <Input placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Url</InputLabel>
            <Input placeholder='Url' onChange={(e) => setUrl(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <FormControl>
            <TextField
              type="datetime-local"
              defaultValue="2022-02-1T10:30"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDate(e.target.value)}
            />
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