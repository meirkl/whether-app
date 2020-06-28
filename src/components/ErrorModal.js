import React, { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setIsError } from '../redux/actions';
import { ReactComponent as CloudError } from '../media/cloud-error.svg';
import { errorColor, white } from '../styles/colors';

const SCModal = styled(Modal)`
  .modal-body {
    background-color: ${errorColor};
    border-radius: 0.3rem 0.3rem 0 0;
    color: ${white};
    font-size: 2rem;
    text-align: center;
    span {
      font-size: 1rem;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorIcon = styled(CloudError)`
  height: 150px;
  margin: 0 auto;
  display: block;
`;

const CloseButton = styled(Button)`
  width: 30%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${errorColor};
  border-color: ${errorColor};
`;

const AdditionalInfo = styled.span`
  display: inline-block;
`;

const ErrorModal = memo(() => {
  const show = useSelector(({ isError }) => isError);
  const dispatch = useDispatch();
  return (
    <SCModal show={show} onHide={() => dispatch(setIsError(!show))}>
      <Modal.Body>
        <div>Oops! Something went wrong.</div>
        <AdditionalInfo>
          This page didn't load correctly. See the console for technical details
        </AdditionalInfo>
        <IconWrapper>
          <ErrorIcon />
        </IconWrapper>
      </Modal.Body>
      <CloseButton
        variant="secondary"
        onClick={() => dispatch(setIsError(!show))}
      >
        Close
      </CloseButton>
    </SCModal>
  );
});

export default ErrorModal;
