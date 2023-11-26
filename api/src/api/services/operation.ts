import { type RequestOptions } from '../../lib/types';
import log from '../../lib/logger';
import axios, { type AxiosResponse } from 'axios';

interface Operation {
  op: string;
  blobNames: string[];
}

export const makeHttpRequest = async (
  options: RequestOptions<
  unknown,
  { cmd: { cmd: string; blobNameBefore: string; blobNameAfter: string } }
  >,
) => {
  try {
    const azFunc = 'http://localhost:7071/api/analyze';
    const cmd = options.params.cmd;
    const { data, status }: AxiosResponse<Operation> = await axios.post(
      azFunc,
      {
        op: cmd.cmd,
        blobNames: [cmd.blobNameBefore, cmd.blobNameAfter],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return {
      status,
      data,
    };
  } catch (error) {
    log.error('Error:', error);
    return {
      status: 500,
      data: {
        result: false,
        message: error,
      },
    };
  }
};
