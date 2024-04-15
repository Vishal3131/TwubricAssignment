import React, { useEffect, useRef, useState } from 'react'
import axios from'axios'

export default function Card() {
  const [User,setUser]=useState([]);
  const [Message,setMessage]=useState();
  const [Ascending,setDescending]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const Twubric=useRef();
  const friend=useRef();
  const Influence=useRef();
  const Chirpiness=useRef();
  const start_date=useRef();
  const end_date=useRef();

  // These are conditionally calling function for ascending order and descending order.

  const Twubric_click = () => {
     Twubric.current.style.backgroundColor = 'grey';
     friend.current.style.backgroundColor = '';
     Influence.current.style.backgroundColor = '';
     Chirpiness.current.style.backgroundColor = '';
    if(Ascending){
      const sortedUsers = [...User].sort((a, b) => a.twubric.total - b.twubric.total);
      setUser(sortedUsers);
      setDescending(false)
      setMessage('Users filter ascending order by Twubric Score')
      console.log(sortedUsers)
    }else{
      const sortedUsers = [...User].sort((a, b) => b.twubric.total - a.twubric.total);
      setUser(sortedUsers);
      setMessage('Users filter descending order by Twubric Score')
      console.log(sortedUsers)
    }
  };

  const Friends_click=()=>{
    Twubric.current.style.backgroundColor = '';
    friend.current.style.backgroundColor = 'grey';
    Influence.current.style.backgroundColor = '';
     Chirpiness.current.style.backgroundColor = '';
    if(Ascending){
      const sortedUsers = [...User].sort((a, b) => a.twubric.friends - b.twubric.friends);
      setUser(sortedUsers);
      setMessage('Users filter ascending order by friends')
      setDescending(false)
    }else{
      const sortedUsers = [...User].sort((a, b) => b.twubric.friends - a.twubric.friends);
      setUser(sortedUsers);
      setMessage('Users filter descending order by friends')
      setDescending(true)
    }
  }

  const Influence_click=()=>{
    Twubric.current.style.backgroundColor = '';
    friend.current.style.backgroundColor = '';
    Influence.current.style.backgroundColor = 'grey';
     Chirpiness.current.style.backgroundColor = '';
    if(Ascending){
      const sortedUsers = [...User].sort((a, b) => a.twubric.influence - b.twubric.influence);
      setUser(sortedUsers);
      setMessage('Users filter ascending order by influence')
      setDescending(false)
    }else{
    const sortedUsers = [...User].sort((a, b) => b.twubric.influence - a.twubric.influence);
    setUser(sortedUsers);
    setMessage('Users filter descending order by influence')
    setDescending(true)
    }
  }

  const Chirpiness_click=()=>{
    Twubric.current.style.backgroundColor = '';
    friend.current.style.backgroundColor = '';
    Influence.current.style.backgroundColor = '';
     Chirpiness.current.style.backgroundColor = 'grey';
    if(Ascending){
      const sortedUsers = [...User].sort((a, b) => a.twubric.chirpiness - b.twubric.chirpiness);
      setUser(sortedUsers);
      setMessage('Users filter ascending order by chirpiness')
      setDescending(false)
    }else{
    const sortedUsers = [...User].sort((a, b) => b.twubric.chirpiness - a.twubric.chirpiness);
    setUser(sortedUsers);
    setMessage('Users filter descending order by chirpiness')
    setDescending(true)
    }
  }

  // delete user per button click
  const Delete=(id)=>{
   const UpdatedUser = User.filter(d=> d.uid !==id);
   setUser(UpdatedUser)
    console.log(UpdatedUser)
  }

  const Date_Filter=()=>{
      console.log(start_date.current.value)
      console.log(end_date.current.value)
  }

useEffect(() => {
  console.log('User state updated:', User);
}, [User]);

  return (
    <>
      
 <div className='container'>

{/* Sort by section */}
<h6 className='mt-5'>Sort by</h6>
<div className='row border border-dark border-1'>
  <div className='col-md-3 justify-content-start align-items-start border border-dark border-rigth border-1 p-1 'ref={Twubric}>
     <span onClick={Twubric_click}>Twubric Score</span>
  </div>
  <div className={`col-md-3 justify-content-start align-items-start border border-dark border-right border-1 p-1`} ref={friend}>
     <span  onClick={Friends_click}>Friends</span>
  </div>
  <div className='col-md-3 justify-content-start align-items-start border border-dark border-rigth border-1 p-1' ref={Influence}>
     <span onClick={Influence_click}>Influence</span>
  </div>
  <div className='col-md-3 justify-content-start align-items-start border border-dark border-rigth border-1 p-1' ref={Chirpiness}>
     <span onClick={Chirpiness_click}>Chirpiness</span>
  </div>
</div>

{/* Filter section */}
<h6 className='mt-5'>Joined Twitter between</h6>
  <div className='row border border-dark border-1 '>
    <div className='col-md-6 d-flex flex-column justify-content-start align-items-start border border-dark border-rigth border-1 p-1'>
      <span>Start date</span>
      <div className='d-flex'>
        <span><i class='bx bx-down-arrow-alt me-4'></i></span>
        <input type='date' className='ms-5' ref={start_date} onChange={Date_Filter}/>
      </div>
    </div>
    <div className='col-md-6 d-flex flex-column justify-content-start align-items-start border border-dark border-rigth border-1 p-1'>
      <span>End date</span>
      <div className='d-flex'>
        <span><i class='bx bx-down-arrow-alt me-4'></i></span>
        <input type='date' className='ms-5' ref={end_date} onChange={Date_Filter}/>
      </div>
    </div>
   
  </div>

{/* Card section */}
<div className='mt-5 text-success fw-bold'>{Message}</div>

<div className='card-section mt-4'>

<div className='row'>

{User.map((d,k)=>(
<div className='col-md-4 mt-4'>
<div className='row' style={{width:'19rem'}}>
    <div className='col-md-12 d-flex justify-content-between border border-dark border-1 p-2'>
      <span>{d.username}</span>
      <span >{d.twubric.total}</span>
    </div>
    <div className='col-md-4 d-flex flex-column justify-content-center align-items-center border border-dark border-1 p-2'>
      <span>{d.twubric.friends}</span>
      <span className='font-small'>Friend</span>
    </div>
    <div className='col-md-4 d-flex flex-column justify-content-center align-items-center border border-dark border-1 p-2'>
      <span>{d.twubric.influence}</span>
      <span className='font-small'>influencer</span>
    </div>
    <div className='col-md-4 d-flex flex-column justify-content-center align-items-center border border-dark border-1 p-2'>
      <span>{d.twubric.chirpiness}</span>
      <span className='font-small'>chirpiness</span>
    </div>
    <div className='col-md-4 d-flex justify-content-between border border-dark border-1 p-2'>
      <span className='font-small'> {new Date(d.join_date * 1000).toLocaleDateString()}</span>
    </div>
    <div className='col-md-8 d-flex justify-content-end border border-dark border-1 p-2'>
      <span className='font-small btn-sm btn-danger' onClick={()=>Delete(d.uid)}>Remove</span>
    </div>
</div>
</div>
 ))}
  </div>
  </div>
 

</div>

    </>
  )
}

