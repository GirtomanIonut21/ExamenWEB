import './App.css';
import Nav from './components/nav';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom'

import CreateMeeting from './components/meetings/create';
import ListMeetings from './components/meetings/list';
import ReadMeeting from './components/meetings/read';
import UpdateMeeting from './components/meetings/update';

import CreateParticipant from './components/participants/create';
import ListParticipants from './components/participants/list';
import ReadParticipant from './components/participants/read';
import UpdateParticipant from './components/participants/update';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path='/' element={<ListMeetings />} />
        <Route exact path='/meetings/create' element={<CreateMeeting />} />
        <Route exact path='/meetings' element={<ListMeetings />} />
        <Route exact path='/meetings/:id' element={<ReadMeeting />} />
        <Route exact path='/meetings/update/:id' element={<UpdateMeeting />} />

        <Route exact path='/participants/create' element={<CreateParticipant />} />
        <Route exact path='/participants' element={<ListParticipants />} />
        <Route exact path='/participants/:id' element={<ReadParticipant />} />
        <Route exact path='/participants/update/:id' element={<UpdateParticipant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
