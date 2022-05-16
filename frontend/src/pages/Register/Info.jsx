import React from 'react'
import { Form, Input, Button } from 'antd';

function Info() {
  return (
    <div className="form">
      <h2>회원정보</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="이름"
          name="username"
          rules={[
            {
              required: true,
              message: '이름을 입력해주세요!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="아이디"
          name="id"
          rules={[
            {
              required: true,
              message: '아이디를 입력해주세요!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          rules={[
            {
              required: true,
              message: '이메일을 입력해주세요!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="닉네임"
          name="nickName"
          rules={[
            {
              required: true,
              message: '닉네임을 입력해주세요!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default Info