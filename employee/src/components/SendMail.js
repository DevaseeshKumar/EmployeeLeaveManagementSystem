import { useState } from 'react'
//import './App.css'
import axios from 'axios'



function SendMail() {
  const [email,setemail] = useState('')
  const [message,setmessage] = useState('')
  const [subject,setsubject] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(email,message)
    const data ={
      email,
      message,
      subject
    }
    const response = await axios.post("https://elms-sdp-project-backend.onrender.com/api/sendMail", data)
    .then(response =>{
      console.log(response)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  return (
    <div>
      <div className="container mt-4">
        <div className='form-control'>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Enter Mail Address: </label>
          <input type='email' placeholder='Email' className="form-control" value={email} onChange={(e) => setemail(e.target.value)}></input>
          </div>
          <br></br>
          <div className="mb-3">
          <label className="form-label">Enter Subject: </label>
          <input type='text' placeholder='Subject' className="form-control" value={subject} onChange={(e) => setsubject(e.target.value)}></input>
          </div>
          <br></br>
          <div className="mb-3">
          <label className="form-label">Enter Message: </label>
          <textarea className="form-control" value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
          </div>
          <br></br>
          <div align="center">
          <button type="submit" className="btn btn-primary">Send Email</button>
        </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default SendMail