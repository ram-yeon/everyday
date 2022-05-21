import React from 'react'
import './Main.css';
import { Layout } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const { Header, Content, Footer, Sider } = Layout;


// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

function Main() {
  return (
    <div>
    <Layout>
      <Header>
        <Title style={{ color: 'white' }} level={3}>명지전문대</Title>
      </Header>
      <Layout>
        <Sider style={{backgound:"red"}}>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    </div>
  );

}

export default Main