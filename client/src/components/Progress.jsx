// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProgressComponent = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Fetch the apprentice's progress from the server
//     const fetchProgress = async () => {
//       try {
//         const response = await axios.post('http://localhost:8082/mentors/aprenantProgress')
//         setProgress(response.data.progress);
//       } catch (error) {
//         console.log('Error fetching progress:', error);
//       }
//     };

//     fetchProgress();
//   }, []);

//   return (
//     <div>
//       <div className="progress-bar-container">
//         <div className="progress-bar" style={{ width: `${progress}%` }}></div>
//       </div>
//       <p>{`${progress.toFixed(1)}%`} Complete</p>
//     </div>
//   );
// };

// export default ProgressComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Progress, ButtonGroup, Button, Row, Col } from 'rsuite';

const ProgressComponent = () => {
  const [percent, setPercent] = useState(0);
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    // Fetch the apprentice's progress from the server
    const fetchProgress = async () => {
      if (!localUser?.userId) return;
      try {
        const response = await axios.get(`http://localhost:8082/aprenants/viewAprenantProfile/${localUser.userId}`, { withCredentials: true });
        const progressValue = response.data?.aprenant?.progress || 0;
        setPercent(progressValue);
      } catch (error) {
        console.log('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [localUser?.userId]);

  const decline = () => {
    const value = Math.max(percent - 10, 0);
    setPercent(value);
  };

  const increase = () => {
    const value = Math.min(percent + 10, 100);
    setPercent(value);
  };

  const status = percent === 100 ? 'success' : null;
  const color = percent === 100 ? '#52c41a' : '#3385ff';

  return (
    <>
      <ButtonGroup>
        <Button onClick={decline}>-</Button>
        <Button onClick={increase}>+</Button>
      </ButtonGroup>
      <hr />
      <Progress.Line percent={percent} strokeColor={color} status={status} />
      <Row>
        <Col md={6}>
          <Progress.Line vertical percent={percent} strokeColor={color} status={status} />
        </Col>
        <Col md={6}>
          <div style={{ width: 120, marginTop: 10 }}>
            <Progress.Circle percent={percent} strokeColor={color} status={status} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProgressComponent;