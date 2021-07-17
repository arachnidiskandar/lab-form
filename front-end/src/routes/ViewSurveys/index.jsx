import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Container, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Survey from './Survey';
import ModalDelete from './ModalDelete';
import Toaster from '../../shared/Toaster';

const mockSurveys = [
  { title: 'título 1', id: 1 },
  { title: 'título 2', id: 2 },
  { title: 'título 3', id: 3 },
  { title: 'título 4', id: 4 },
  { title: 'título 5', id: 5 },
];

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& .survey-list': {
    marginTop: '10vh',
  },
});
const ViewSurveys = () => {
  const [surveys, setSurveys] = useState(mockSurveys);
  const [modalDeleteState, setModalDeleteState] = useState({ open: false });
  const [toasterState, setToasterState] = useState({ open: false });

  const handleModalDelete = (id) => {
    setModalDeleteState({ open: true, id });
  };

  const closeModalDelete = () => setModalDeleteState({ open: false });
  const closeToaster = () => setToasterState({ open: false });

  const handleDeleteSurvey = () => {
    setSurveys((prevState) => prevState.filter((survey) => survey.id !== modalDeleteState.id));
    closeModalDelete();
  };

  return (
    <PageContainer>
      <Typography variant="h4">Meus questionários</Typography>
      <div className="survey-list">
        {surveys.map((surveyData) => (
          <Survey id={surveyData.id} data={surveyData} onDeleteClick={handleModalDelete} />
        ))}
      </div>
      <ModalDelete
        open={modalDeleteState.open}
        handleClose={() => closeModalDelete()}
        handleConfirm={() => handleDeleteSurvey()}
      />
      <Toaster toasterState={toasterState} onClose={closeToaster} />
    </PageContainer>
  );
};

export default ViewSurveys;
