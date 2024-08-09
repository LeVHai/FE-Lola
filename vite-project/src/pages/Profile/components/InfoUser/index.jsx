import { Card, Typography } from 'antd'
import React from 'react'
import moment from 'moment'
const InfoUser = ({user}) => {
  return (
    <Card size="small">
    <Typography.Title level={5}>Thông tin</Typography.Title>
    <ul>
      {user?.bio && <li>{user.bio}</li>}
      {user?.email && (
        <li>
          <i className="fa-regular fa-envelope"></i>
          <span className="pl-2">{user.email}</span>
        </li>
      )}
      {user?.website && (
        <li>
          <i className="fa-solid fa-link"></i>
          <span className="pl-2">
            <a href={user.website} target="_blank">
              {user.website}
            </a>
          </span>
        </li>
      )}
      {user?.date_of_birth && (
        <li>
          <i className="fa-regular fa-calendar-days"></i>
          <span className="pl-2">
            {moment(user.date_of_birth).format("DD/MM/YYYY")}
          </span>
        </li>
      )}
     {user?.location &&  <li>
        <i className="fa-solid fa-location-dot"></i>
        <span className="pl-2">{user?.location || "Unknown"}</span>
      </li>}
    </ul>
  </Card>
  )
}

export default InfoUser