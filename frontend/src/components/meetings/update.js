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

  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${apiUrl}/meetings/${id}`)
      const meeting = data.data;
      setDescription(meeting.description)
      setUrl(meeting.url)
      setDate(meeting.date)
    }
    fetch();
  }, [])

  const postData = async () => {
    try {
      await axios.put(`${apiUrl}/meetings/${id}`, {
        description,
        url,
        date
      });
      navigate(`/meetings/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <h2>Update meeting</h2>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Description</InputLabel>
            <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <FormControl>
            <InputLabel>Url</InputLabel>
            <Input placeholder='Url' value={url} onChange={(e) => setUrl(e.target.value)} />
          </FormControl>
        </Box>
        <Box gridColumn="span 12">
          <FormControl>
            <TextField
              type="datetime-local"
              defaultValue="2022-02-1T10:30"
              value={date}
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

export default Update;