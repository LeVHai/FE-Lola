import { Button } from 'antd'
import React from 'react'
import{useNavigate}from 'react-router-dom'
import './style.scss'
import { ArrowLeftOutlined } from '@ant-design/icons'
const Back = () => {
    const navigate = useNavigate()
    const handleBackRoute = ()=>{
        navigate(-1)
    }
  return (
   <div className='back'>
    <Button type='primary' icon={<ArrowLeftOutlined/>} onClick={()=>handleBackRoute()}>
        Quay lại
    </Button>
   </div>
  )
}

export default Back