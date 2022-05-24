// import React, { useState } from 'react'
// import '../Forgot.css'
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box'

// function UserId() {

//   const handlesubmit = (event) => {
//     event.preventDefualt();
//   }

//   const [value, setValue] = useState('one');
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className="main-forgot">
//       <div className="forgot-contain">
//         <div className="forgot-content">
//           <Box sx={{ width: '100%' }}>

//             <Tabs
//               sx={{ marginTop: '1rem' }}
//               centered
//               value={value}
//               onChange={handleChange}
//               TabIndicatorProps={{ style: { background: '#C00000' } }}>
//               <Tab value="one" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>아이디 찾기</span>} />
//               <Tab value="two" label={<span style={{ color: '#C00000', fontWeight: 'bold' }}>비밀번호 찾기</span>} />
//             </Tabs>
//           </Box>

//           <form onSubmit={handlesubmit}>
//             <button type="submit" id="emailAuth-btn" >이메일 인증</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserId
