import { type RequestOptions } from '../../lib/types';
import * as path from 'path';
import { spawn } from 'child_process';
import log from '../../lib/logger';

interface ProcessData {
  result: boolean;
  message: string;
}

interface IProcessResult {
  status: number;
  data: ProcessData | string;
}

export const spawnProcess = async (
  options: RequestOptions<
  unknown,
  { cmd: { cmd: string; blobNameBefore: string; blobNameAfter: string } }
  >,
) => {
  const cmd = options.params.cmd;
  const pythonProcess = spawn('python3', [
    path.join(__dirname, '../../../../backend/dispatcher.py'),
    cmd.cmd,
    cmd.blobNameBefore,
    cmd.blobNameAfter,
  ]);

  let dataRes = '';
  let errorRes = '';

  const handleProcessCompletion = async () => {
    if (errorRes.length) {
      log.info(`stderr data: ${errorRes}`);
      return await Promise.resolve({
        status: 500,
        data: {
          result: false,
          message: errorRes,
        },
      });
    }

    log.info(`stdout data: ${dataRes}`);
    return await Promise.resolve({
      status: 200,
      data: dataRes,
    });
  };

  // Attach event handlers
  pythonProcess.stdout.on('data', (data) => {
    const parsedData = JSON.parse(data);
    dataRes += JSON.stringify(parsedData);
  });
  pythonProcess.stderr.on('data', (data) => {
    const parsedData = JSON.parse(data);
    errorRes += JSON.stringify(parsedData);
  });

  // Wrap the process completion logic in a promise
  const processCompletionPromise = new Promise<PromiseLike<IProcessResult>>(
    (resolve, reject) => {
      pythonProcess.on('close', () => {
        const result = handleProcessCompletion();
        resolve(result);
      });

      // Handle process errors
      pythonProcess.on('error', (err) => {
        reject(err);
      });
    },
  );
<<<<<<< HEAD

=======
>>>>>>> 93785a3 (Revert "Erase operation endpoint from api code")
  // Wait for the process to complete and return the result
  return await processCompletionPromise;
};
