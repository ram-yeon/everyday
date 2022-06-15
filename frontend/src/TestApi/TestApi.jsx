//API TEST

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestApi() {

  const [hello, setHello] = useState('')

  useEffect(
    () => {
      //서버로 통신을 요청하는부분
      axios({
        url: '/testapi',
        method: 'GET'
      })
        //통신 이후 응답받았때 처리하는부분
        .then(response => setHello(response.data))
        //응답받은이후 에러발생했을때 처리하는부분
        .catch(error => console.log(error))
    }, []
  );

  return (
    <div>
      저는 React입니다~ 아래는 백엔드에서 가져온 데이터입니다.<br />
      {hello}
    </div>
  );
}

export default TestApi;