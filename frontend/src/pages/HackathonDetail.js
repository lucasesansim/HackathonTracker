import React from 'react';
import { useParams } from 'react-router-dom';

const HackathonDetail = () => {
  const params = useParams();
  const { hackathonId } = params;

  console.log(hackathonId);
  return (
    <div className=''>
      <h1>Hackathon Detail</h1>
    </div>
  );
}

export default HackathonDetail;