import getDatabasePool from '../../adapters/database';
import log from '../../lib/logger';
import {
  DELETE_LESION,
  GET_LESION,
  INSERT_LESION,
  UPDATE_LESION,
} from '../../lib/sqlQueries';
import { type RequestOptions } from '../../lib/types';
import type Lesion from '../../models/lesion';
import sql from 'mssql';
import { getPhotosByLesionId } from './photo';
import type Photo from '../../models/photo';

function LesionFromRecord(record: any, photos: Photo[]): Lesion {
  return {
    id: record.id_lesion as number,
    name: record.name as string,
    photos,
  };
}

type LesionPostRequestOptions = RequestOptions<Lesion, unknown>;

export const postLesion = async (options: LesionPostRequestOptions) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Inserting new lesion');
    ps.input('name', sql.VarChar);
    ps.input('id_owner', sql.BigInt);
    await ps.prepare(INSERT_LESION);
    const dbResquest = await ps.execute({
      name: options.body.name,
      id_owner: 0,
    });
    log.info(dbResquest.rowsAffected, 'Lesion was inserted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Ok',
      },
    };
  } catch (error) {
    log.error(error, 'Error inserting lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error inserting lesion',
      },
    };
  }
};

type LesionGetRequestOptions = RequestOptions<unknown, { id: number }>;

export const getLesionbyId = async (options: LesionGetRequestOptions) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Getting lesion');
    ps.input('id', sql.BigInt);
    await ps.prepare(GET_LESION);
    const dbRequest = await ps.execute({
      id: options.params.id,
    });
    if (dbRequest.recordset.length === 0) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Lesion does not exists',
        },
      };
    }
    log.info(dbRequest.rowsAffected, 'Lesion was returned');
    const { status, data } = await getPhotosByLesionId({
      params: { idLesion: options.params.id },
      body: null,
    });
    if (status !== 200) {
      return {
        status: 400,
        data: {
          result: false,
          message: 'Error gettings photos',
        },
      };
    }
    const photos = data as Photo[];
    return {
      status: 200,
      data: LesionFromRecord(dbRequest.recordset[0], photos),
    };
  } catch (error) {
    log.error(error, 'Error getting lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting lesion',
      },
    };
  }
};

type LesionPatchRequestOptions = RequestOptions<Lesion, { id: number }>;

export const patchLesionById = async (options: LesionPatchRequestOptions) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Updating lesion');
    ps.input('id', sql.BigInt);
    ps.input('name', sql.VarChar);
    await ps.prepare(UPDATE_LESION);
    const dbRequest = await ps.execute({
      id: options.params.id,
      name: options.body.name,
    });
    log.info(dbRequest.rowsAffected, 'Lesion was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Updated successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error updating lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error updating lesion',
      },
    };
  }
};

type LesionDeleteRequestOptions = RequestOptions<unknown, { id: number }>;

export const deleteLesionById = async (options: LesionDeleteRequestOptions) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Deleting lesion');
    ps.input('id', sql.BigInt);
    await ps.prepare(DELETE_LESION);
    const dbRequest = await ps.execute({
      id: options.params.id,
    });
    log.info(dbRequest.rowsAffected, 'Lesion was deleted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Deleted successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error deleting lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error deleting lesion',
      },
    };
  }
};
