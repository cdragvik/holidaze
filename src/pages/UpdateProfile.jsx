import React, { useState } from 'react';
import { save } from '../api/storage';

const UpdateAvatarPage = ({ profile, onUpdateAvatar }) => {
  const [newAvatar, setNewAvatar] = useState('');

  const handleUpdateAvatar = () => {
    // Update the avatar in the profile
    profile.avatar = newAvatar;
    save('profile', profile);

    // Call the parent function to trigger an update
    onUpdateAvatar();

    // Redirect back to the profile page
    window.location.href = `/profile/${profile.name}`;
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      <input
        type="text"
        placeholder="New Avatar URL"
        value={newAvatar}
        onChange={e => setNewAvatar(e.target.value)}
      />
      <button onClick={handleUpdateAvatar}>Update Avatar</button>
    </div>
  );
};

export default UpdateAvatarPage;
