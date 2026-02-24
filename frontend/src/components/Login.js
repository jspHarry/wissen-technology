import React,{useState} from 'react';
import axios from 'axios';

export default function Login({ setToken, setView }){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);

  const login = async () => {
    setErr(null);
    setLoading(true);
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login',{ email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    }catch(e){
      setErr(e.response?.data?.msg || 'Login failed');
    }finally{ setLoading(false); }
  };

  return (
    <div style={{padding:20}}>
      <h2>Welcome back</h2>
      <p className="muted">Login with your company email</p>
      <div style={{marginTop:12}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn" onClick={login} disabled={loading}>{loading? '...' : 'Login'}</button>
          <button className="btn secondary" onClick={()=>setView('register')}>Create account</button>
        </div>
        {err && <p style={{color:'var(--danger)',marginTop:8}}>{err}</p>}
      </div>
    </div>
  );
}
