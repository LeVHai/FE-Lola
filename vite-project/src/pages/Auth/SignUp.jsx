import { Button, DatePicker, Flex, Form, Input, Typography } from "antd";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
  const { t } = useTranslation();
  const initialValue = {
    name: null,
    email: null,
    password: null,
    confirm_password: null,
    date_of_birth: null,
  };
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(initialValue);

  const navigate = useNavigate()
  const dispatch = useDispatch();

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
        case "name":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = t("common.validate_field");
          }
          break;
        case "email":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = t("common.validate_field");
          }

          break;
        case "password":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = t("common.validate_field");
          }
          break;
        case "confirm_password":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = t("common.validate_field");
          }
          break;
        case "date_of_birth":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = t("common.validate_field");
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
      return (
        <span
          style={{
            display: "block",
            color: "red",
            fontSize: "12px",
            marginTop: "10px",
          }}
        >
          {error[field]}
        </span>
      );
    }
  };

  const submit = () => {
    let validate = validateData([], data);
    if (validate) return;
    // dispatch(fetchRegisterUser(data))
    //   .unwrap()
    //   .catch((err) => {
    //     const _error = { ...error };
    //     Object.keys(err.error).map((e) => {
    //       switch (e) {
    //         case "name":
    //           console.log("dsdds");
    //       _error[e] = err.error[e].msg
    //           break;
    //         case "email":
    //           _error[e] = err.error[e].msg
    //           break;
    //         case "password":
    //           _error[e] = err.error[e].msg
    //           break;
    //         case "confirm_password":
    //           _error[e] = err.error[e].msg
    //           break;
    //         case "date_of_birth":
    //           _error[e] = err.error[e].msg
    //           break;

    //         default:
    //           break;
    //       }
    //     });
    //     setError(_error)
    //   });
  };
  return (
    <>
      <Flex justify="center" align="center" className="auth">
        <div className="bg-glass">
          <Form layout="vertical">
            <Form.Item>
              <Typography.Title level={3}>
                {t("common.register")}
              </Typography.Title>
            </Form.Item>
            <Form.Item label={"name"}>
              <Input
                onChange={(e) => onChangeData("name", e.target.value)}
                style={{ width: "100%" }}
              />
              {renderError("name")}
            </Form.Item>
            <Form.Item label={t("common.email")}>
              <Input
                onChange={(e) => onChangeData("email", e.target.value)}
                style={{ width: "100%" }}
              />
              {renderError("email")}
            </Form.Item>
            <Form.Item label={t("common.password")}>
              <Input.Password
                onChange={(e) => onChangeData("password", e.target.value)}
                style={{ width: "100%" }}
              />
              {renderError("password")}
            </Form.Item>
            <Form.Item label={t("common.confirm_password")}>
              <Input.Password
                onChange={(e) =>
                  onChangeData("confirm_password", e.target.value)
                }
                style={{ width: "100%" }}
              />
              {renderError("confirm_password")}
            </Form.Item>
            <Form.Item label={t("common.date_of_birth")}>
              <DatePicker
                onChange={(e) => onChangeData("date_of_birth", e.$d)}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
              {renderError("date_of_birth")}
            </Form.Item>
            <Form.Item>
              <Button onClick={submit} type="primary" style={{ width: "100%" }}>
                {t("common.register")}
              </Button>
            </Form.Item>
            <Flex justify="center">
              <Typography.Text>
                {t("common.have_account")}{" "}
                <Button type="link" onClick={()=> navigate('/sign-in')}>{t("common.login")}</Button>
              </Typography.Text>
            </Flex>
          </Form>
        </div>
      </Flex>
    </>
  );
};

export default SignUp;
