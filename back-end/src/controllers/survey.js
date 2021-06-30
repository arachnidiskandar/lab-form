import { Request, Response } from 'express';
import mongoose from 'mongoose'; //firebase

import Survey from '../survey'; // verificar se precisar fazer um model pro bagulho do firebase

const createSurvey = (req, res) => {
  const { title, coordinator, questions, availableToAnyone } = req.body;

  const survey = new Survey({ // salvar no firebase
    _id: new mongoose.Types.ObjectId(),
    title,
    coordinator,
    questions,
    availableToAnyone,
  });
  survey
    .save()
    .then((result) => res.status(201).json(result.toJSON()))
    .catch((err) => res.status(500).json({ message: err.message, err }));
};

const deleteSurvey = (req, res) => {
  const { id } = req.params;

  Survey.deleteOne({ _id: id })
    .then(() => res.status(204).json({}))
    .catch((err) => res.status(500).json({ message: err.message, err }));
};
export default { createSurvey, deleteSurvey };
