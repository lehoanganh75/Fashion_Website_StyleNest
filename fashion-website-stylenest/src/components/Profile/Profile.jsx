import React from 'react';
import ProfileCard from './ProfileCard';
import data from '../../data/user.json'; 

const Profile = () => {
  return (
    <div>
      <ProfileCard users={data} />
    </div>
  );
};

export default Profile;
