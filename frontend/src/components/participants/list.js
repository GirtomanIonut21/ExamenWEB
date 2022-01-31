import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Box, Container, Button } from '@mui/material';
import { apiUrl } from '../../config'

const List = () => {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'meetingId', headerName: 'Meeting' },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/participants/${params.row.id}`}>View participant</Link>
        );
      }
    },];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${apiUrl}/participants`)
      setRows(data.data)
    }
    fetch();
  }, [])

  return (
    <Container maxWidth="xl">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 10">
          <h2>Participants list</h2>
        </Box>
        <Box gridColumn="span 2">
          <Link to={`/participants/create`}><Button>Create participant</Button></Link>
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