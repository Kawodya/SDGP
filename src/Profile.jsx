// UserProfile.js
import React, { useState } from 'react';
import './profile.css'; // Import your CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Sudew',
    lastName: 'Abhayapala',
    email: 'yeeeeedoe@gmail.com',
    profilePicture: 'default.jpg', // Provide a default image URL
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-picture">
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handlePictureChange}
        />
        {profileData.profilePicture && (
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="profile-image"
          />
        )}
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={profileData.firstName}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={profileData.lastName}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default Profile;
