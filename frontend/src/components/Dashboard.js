import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default function Dashboard({ token, setToken }){
  const [date,setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [bookings,setBookings] = useState([]);
  const [myBookings,setMyBookings] = useState([]);
  const [seats,setSeats] = useState([]);

  useEffect(()=>{
    // seed local seat view
    const arr = Array.from({length:50},(_,i)=>{
      const n = i+1;
      return { seatNumber: n, type: n<=40 ? 'RESERVED' : 'FLOATER' };
    });
    setSeats(arr);
    fetchBookings();
    fetchMyBookings();
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    fetchBookings(); fetchMyBookings();
    // eslint-disable-next-line
  },[date]);

  const fetchBookings = async ()=>{
    try{
      const res = await axios.get(`http://localhost:5000/api/bookings/${date}`, { headers: { Authorization: token } });
      setBookings(res.data);
    }catch(e){ console.error(e); setBookings([]); }
  };

  const fetchMyBookings = async ()=>{
    try{
      const res = await axios.get(`http://localhost:5000/api/bookings/mine/${date}`, { headers: { Authorization: token } });
      setMyBookings(res.data);
    }catch(e){ console.error(e); setMyBookings([]); }
  };

  const book = async (seatNumber)=>{
    try{
      await axios.post('http://localhost:5000/api/bookings', { seatNumber, date }, { headers: { Authorization: token } });
      fetchBookings(); fetchMyBookings();
    }catch(e){
      alert(e.response?.data?.msg || 'Booking error');
    }
  };

  const cancel = async (id)=>{
    try{
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, { headers: { Authorization: token } });
      fetchBookings(); fetchMyBookings();
    }catch(e){ alert('Cancel failed'); }
  };

  const logout = ()=>{
    localStorage.removeItem('token');
    setToken(null);
  };

  const isBooked = (n) => bookings.some(b => b.seatNumber === n && b.status === 'BOOKED');
  const isMine = (n) => myBookings.some(b => b.seatNumber === n && b.status === 'BOOKED');

  return (
    <div className="container">
      <div className="header-row">
        <div>
          <h2>Office Seat Booking</h2>
          <div className="small muted">Date: <strong>{date}</strong></div>
        </div>
        <div style={{marginLeft:'auto'}} className="topbar">
          <button className="btn secondary" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <label className="small">Select date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>

        <div className="grid">
          {seats.map(s => {
            const booked = isBooked(s.seatNumber);
            const mine = isMine(s.seatNumber);
            const cls = 'seat ' + (s.type === 'RESERVED' ? 'reserved' : 'floater') + (booked ? ' booked' : '') + (mine ? ' mine' : '');
            return (
              <div key={s.seatNumber} className={cls} onClick={()=>{
                if(mine) return alert('You already booked this seat');
                if(booked) return alert('Seat already booked');
                book(s.seatNumber);
              }}>
                <div style={{textAlign:'center'}}>
                  <div style={{fontWeight:600}}>#{s.seatNumber}</div>
                  <div className="small">{s.type}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{marginTop:16}}>
          <h3>My bookings for {date}</h3>
          <div className="bookings-list">
            {myBookings.length === 0 && <div className="muted">No bookings</div>}
            {myBookings.map(b => (
              <div key={b._id} className="booking-item">
                <div>Seat #{b.seatNumber} - {b.date}</div>
                <div>
                  <button className="btn secondary" onClick={()=>cancel(b._id)}>Release</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:16}}>
          <h3>All bookings ({bookings.length})</h3>
          <div className="bookings-list">
            {bookings.map(b=>(
              <div key={b._id} className="booking-item">
                <div>#{b.seatNumber} — {b.employee?.name || 'Unknown'}</div>
                <div className="small">{b.seat?.type || ''}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
