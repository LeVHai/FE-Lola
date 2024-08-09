import React from 'react'
import Profile from '../../Profile/ProfileDetail'

const ProfileUser = () => {
  return (
    <div>
         <Profile
      user={user}
      post={posts}
      isOwnProfile={isOwnProfile}
      token={access_token}
      handleFetchData={handleFetchData}
      hasMore={hasMore}
    />
    </div>
  )
}

export default ProfileUser