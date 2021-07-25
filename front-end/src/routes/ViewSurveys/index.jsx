import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';

import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import Survey from './Survey';
import ModalDelete from './ModalDelete';
import Toaster from '../../shared/Toaster';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& .survey-list': {
    marginTop: '10vh',
  },
});
const ViewSurveys = () => {
  const [surveys, setSurveys] = useState(null);
  const [modalDeleteState, setModalDeleteState] = useState({ open: false });
  const [toasterState, setToasterState] = useState({ open: false });

  const handleModalDelete = (id) => {
    setModalDeleteState({ open: true, id });
  };

  const closeModalDelete = () => setModalDeleteState({ open: false });

  const closeToaster = () => setToasterState({ open: false });

  const handleDeleteSurvey = async () => {
    try {
      await axios.delete('/forms/delete', { data: { id: modalDeleteState.id } });
      setSurveys((prevState) => prevState.filter((survey) => survey.id !== modalDeleteState.id));
      closeModalDelete();
      setToasterState({ open: true, message: 'Questionário Deletado', type: 'success' });
    } catch (error) {
      setToasterState({ open: true, message: error.message, type: 'error' });
    }
  };

  const getAllSurveys = async () => {
    try {
      const { data } = await axios.get('/forms');
      setSurveys(data);
    } catch (error) {
      setToasterState({ open: true, message: error.message, type: error });
    }
  };

  const copyLink = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToasterState({ open: true, message: 'Link copiado', type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllSurveys();
  }, []);
  return (
    <PageContainer>
      <Typography variant="h4">Meus questionários</Typography>
      <div className="survey-list">
        {surveys &&
          surveys.map((surveyData) => (
            <Survey key={surveyData.id} data={surveyData} onDeleteClick={handleModalDelete} onCopy={copyLink} />
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
