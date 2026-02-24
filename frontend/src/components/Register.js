import React,{useState} from 'react';
import axios from 'axios';

export default function Register({ setView }){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [batch,setBatch]=useState(1);
  const [msg,setMsg]=useState(null);

  const register=async ()=>{
    try{
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password, batch });
      setMsg('Registered. You can login now.');
      setTimeout(()=>setView('login'), 1200);
    }catch(e){
      setMsg(e.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Create account</h2>
      <p className="muted">Use your details to sign up</p>
      <div style={{marginTop:12}}>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Company Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <label className="small">Batch</label>
        <select value={batch} onChange={e=>setBatch(Number(e.target.value))}>
          <option value={1}>Batch 1</option>
          <option value={2}>Batch 2</option>
        </select>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn" onClick={register}>Register</button>
          <button className="btn secondary" onClick={()=>setView('login')}>Back to login</button>
        </div>
        {msg && <p style={{marginTop:8}} className="muted">{msg}</p>}
      </div>
    </div>
  );
}
