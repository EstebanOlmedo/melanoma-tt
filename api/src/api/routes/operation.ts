import { type RequestHandler, Router } from 'express';
import { spawnProcess } from '../services/operation';

const operationRouter = Router({ mergeParams: true });
operationRouter.patch('/analyze/:operation', (async (req, res, next) => {
  if (req.params.operation == null) {
    return res.status(400).send({
      result: false,
      message: 'missing operation to do',
    });
  }
  const badRequest = () => {
    return res.status(400).send({
      result: false,
      message: 'bad request',
    });
  };
  const operation = req.params.operation;
  if (
    req.body.blobNames == null ||
    req.body.blobNames.length < 1 ||
    req.body.blobNames.length > 2
  ) {
    return badRequest();
  }
  const cmd = {
    cmd: '',
    blobName1: '',
    blobName2: '',
  };
  switch (operation) {
    case 'compare':
      cmd.cmd = 'compare';
      cmd.blobName1 = req.body.ids[0];
      cmd.blobName2 = req.body.ids[1];
      break;
    case 'classify':
      cmd.cmd = 'classify';
      cmd.blobName1 = req.body.ids[0];
      break;
    case 'extract':
      cmd.cmd = 'extract';
      cmd.blobName1 = req.body.ids[0];
      break;
    default:
      return badRequest();
  }
  const options = {
    params: {
      cmd,
    },
    body: null,
  };
  spawnProcess(options)
    .then((result) => {
      res.status(result.status).send(result.data);
    })
    .catch((error) => {
      next(error);
    });
}) as RequestHandler);

export default operationRouter;
