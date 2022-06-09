import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestApi() {

  const [hello, setHello] = useState('')

  useEffect(
    () => {
      axios({
        url: '/testapi',
        method: 'GET'
      })
        .then(response => setHello(response.data))
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