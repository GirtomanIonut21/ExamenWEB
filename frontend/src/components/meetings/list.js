import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Box, Container, Button } from '@mui/material';
import { apiUrl } from '../../config'

const List = () => {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'description', headerName: 'Description' },
    { field: 'url', headerName: 'Url' },
    { field: 'date', headerName: 'Date' },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/meetings/${params.row.id}`}>View meeting</Link>
        );
      }
    },];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data } = await axios.get(`${apiUrl}/meetings`)
      const meetings = data.data;
      setRows(meetings)
    }
    fetchMeetings();
  }, [])

  return (
    <Container maxWidth="xl">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 10">
          <h2>Meetings list</h2>
        </Box>
        <Box gridColumn="span 2">
          <Link to={`/meetings/create`}><Button>Create new meeting</Button></Link>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <div style={{ minHeight: '400px', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </Container>
  );
}

export default List;