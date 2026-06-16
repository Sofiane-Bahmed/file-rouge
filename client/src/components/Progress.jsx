import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { Progress, ButtonGroup, Button, Row, Col } from 'rsuite';

const ProgressComponent = () => {
  const [percent, setPercent] = useState(0);
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    // Fetch the apprentice's progress from the server
    const fetchProgress = async () => {
      if (!localUser?.userId) return;
      try {
        const response = await apiClient.get(`/aprenants/viewAprenantProfile/${localUser.userId}`);
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