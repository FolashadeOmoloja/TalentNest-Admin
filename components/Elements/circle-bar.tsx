import React from 'react'
import styled from "styled-components";

interface ProgressBarProps {
  percentage: number;
  circleWidth: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  warningColor?: string;
  text?: string;
}

interface ProgressBarStyle{
    strokeColor?: string 
}

const ProgressBarContainer = styled.svg<ProgressBarStyle>`
  .circular-background {
    fill: none;
    stroke: #ECF7EA;
  }

  .circular-progress {
    fill: none;
    stroke: ${(props) =>
      props.strokeColor ? props.strokeColor : "#38AF00"}; // default to green
  }
`;

const ProgressBar: React.FC<ProgressBarProps>= ({percentage, circleWidth,warningColor="#DFCE00", text='Total number Of Loan'}) => {
  const radius= 85;
  const dashArray= radius * Math.PI * 2;
  const dashOffset =dashArray - (dashArray * percentage)/100;

  let strokeColor = "#38AF00"; // default to green
  if (percentage >= 70) {
    strokeColor = "#38AF00"; // green
  } else if (percentage >= 40) {
    strokeColor = warningColor; // blue
  } else {
    strokeColor = "#B00020"; // red
  }

  return (
    <div>
      <ProgressBarContainer
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        strokeColor={strokeColor} // pass the stroke color as a prop to the styled component
      >
        <circle
          cx={circleWidth/2}
          cy={circleWidth/2}
          strokeWidth='15px'
          r={radius}
          className='circular-background'
        />
        <circle
          cx={circleWidth/2}
          cy={circleWidth/2}
          strokeWidth='15px'
          r={radius}
          className='circular-progress'
          style={{
            strokeDasharray: `${dashArray}`,
            strokeDashoffset: `${dashOffset}`
          }}
          transform={`rotate(-90 ${circleWidth/2} ${circleWidth/2})`}
        />
        <text x='30%' y='40%' dy='0.3em' style={{fontSize: '10px', fontWeight: '500'}}>{text}</text>
        <text x='43%' y='55%' dy='0.3em' style={{fontSize: '25px', fontWeight: '700'}}>{percentage}%</text>
      </ProgressBarContainer>
    </div>
  )
}

export default ProgressBar;
