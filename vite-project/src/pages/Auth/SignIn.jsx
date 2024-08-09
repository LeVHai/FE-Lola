import { Button, Flex, Form, Input, message, Typography } from "antd";
import "./style.scss";
import {useTranslation} from 'react-i18next'
import { useState } from "react";
import _ from 'lodash'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../core/slices/authSlice";
const SignIn = () => {
const {t} = useTranslation()
const initialValue ={
  email: null,
  password:null
}
const[data,setData] =useState(initialValue)
const[error, setError] = useState(initialValue)

const navigate = useNavigate()

const dispatch = useDispatch()

const onChangeData = (prop, value) => {
  let _data = _.cloneDeep(data);
  _data[prop] = value;
  validateData([prop], _data);
  setData(_data);
};

const validateData = (prop, _data) => {
  let _error = _.cloneDeep(error);
  let requiredFields = prop.length > 0 ? prop : Object.keys(_data);
  let _prop = requiredFields;
  for (const field of _prop) {
    switch (field) {
      case "email":
        _error[field] = "";
        if (!_data[field]) {
          _error[field] = t("common.email_required");
        }

        break;
      case "password":
        _error[field] = "";
        if (!_data[field]) {
          _error[field] = t("common.password_required");
        }
        break;
      default:
        break;
    }
  }
  setError(_error);
  let count = 0;
  for (const key in _error) {
    if (_error[key]) {
      count++;
    }
  }
  return count;
};

const renderError = (field) => {
  if (error[field]) {
    return <span style={{ display:"block",color:"red", fontSize:"12px", marginTop:"10px"}}>{error[field]}</span>;
  }
};

const submit = ()=>{
  let validate = validateData([], data);
  if (validate) return;
  dispatch(login(data))
  setTimeout(()=>{
    navigate('/')
  },1000)
  message.success("Đăng nhập thành công!")
}
  return (
    <>
      <Flex justify="center" align="center" className="auth">
        <div className="bg-glass">
          <Form layout="vertical">
            <Form.Item>
              <Typography.Title level={3}>{t("common.login")}</Typography.Title>
            </Form.Item>
            <Form.Item label={t("common.email")} >
              <Input onChange={(e)=> onChangeData("email", e.target.value)} style={{width:"100%"}} />
              {renderError("email")}
            </Form.Item>
            <Form.Item label={t("common.password")}>
              <Input.Password onChange={(e)=> onChangeData("password", e.target.value)}  style={{width:"100%"}}/>
              {renderError("password")}
            </Form.Item>
            <Form.Item >
              <Button onClick={submit} type="primary" style={{width:"100%"}}>{t("common.login")}</Button>
            </Form.Item>
            <Flex justify="center">
              <Typography.Text>{t("common.no_account")} <Button onClick={()=> navigate('/sign-up')} type="link">{t("common.register")}</Button></Typography.Text>
            </Flex>
          </Form>
        </div>
      </Flex>
    </>
  );
};

export default SignIn;
