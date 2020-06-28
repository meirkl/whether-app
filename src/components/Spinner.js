import React from 'react';
import { ReactComponent as SpinnerSvg } from '../media/spinner.svg';
import styled from 'styled-components';

const Spinner = styled(SpinnerSvg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default () => <Spinner />;
