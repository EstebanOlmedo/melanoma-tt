import getDatabasePool from '../../adapters/database';
import log from '../../lib/logger';
import { type RequestOptions } from '../../lib/types';
import sql from 'mssql';
import type Photo from '../../models/photo';
import {
  ADD_BLOB_TO_PHOTO,
  DELETE_PHOTO,
  GET_PHOTO,
  GET_PHOTOS_BY_LESION_ID,
  INSERT_PHOTO,
  UPDATE_PHOTO,
} from '../../lib/sqlQueries';
import { downloadImage, uploadImage } from '../../adapters/blobStorage';
import type Image from '../../models/image';

function photoFromRecord(record: any, image: Image): Photo {
  return {
    id: record.id_photo as number,
    name: record.name as string,
    dateOfCreation: record.creation_timestamp as number,
    description: record.description as string,
    blobName: record.blob_name as string,
    image,
  };
}

export const postPhoto = async (
  options: RequestOptions<Photo, { idLesion: number }>,
) => {
  try {
    const pool = await getDatabasePool();
    let ps = new sql.PreparedStatement(pool);
    log.info('Inserting new photo');
    ps.input('name', sql.VarChar);
    ps.input('timestamp', sql.BigInt);
    ps.input('description', sql.VarChar);
    ps.input('idLesion', sql.BigInt);
    await ps.prepare(INSERT_PHOTO);
    const dbRequest = await ps.execute({
      idLesion: options.params.idLesion,
      name: options.body.name,
      timestamp: options.body.dateOfCreation,
      description: options.body.description,
    });
    log.info(dbRequest.rowsAffected, 'Photo was inserted');
    const idPhoto = dbRequest.recordset[0].id_photo;
    await uploadImage({
      data: options.body.image.data,
      name: String(idPhoto),
      ext: 'jpg',
    });
    ps = new sql.PreparedStatement(pool);
    ps.input('blob', sql.VarChar);
    ps.input('id', sql.BigInt);
    await ps.prepare(ADD_BLOB_TO_PHOTO);
    const dbRequestBlobName = await ps.execute({
      blob: `${idPhoto}.jpg`,
      id: idPhoto,
    });
    log.info(dbRequestBlobName.rowsAffected, 'Photo blob name was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Ok',
      },
    };
  } catch (error) {
    log.error(error, 'Error inserting photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error inserting photo',
      },
    };
  }
};

export const getPhotosByLesionId = async (
  options: RequestOptions<unknown, { idLesion: number }>,
) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Getting photos');
    ps.input('id', sql.BigInt);
    await ps.prepare(GET_PHOTOS_BY_LESION_ID);
    const dbRequest = await ps.execute({
      id: options.params.idLesion,
    });
    log.info(dbRequest.rowsAffected, 'Photos were returned');
    const images = await Promise.all(
      dbRequest.recordset.map(async (photo) => {
        return await downloadImage(photo.blob_name);
      }),
    );
    const photos = dbRequest.recordset.map((photo, index) => {
      return photoFromRecord(photo, images[index]);
    });
    return {
      status: 200,
      data: photos,
    };
  } catch (error) {
    log.error(error, 'Error getting photos');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting photos',
      },
    };
  }
};

export const getPhotobyId = async (
  options: RequestOptions<unknown, { idLesion: number; idPhoto: number }>,
) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Getting photo');
    ps.input('id', sql.BigInt);
    await ps.prepare(GET_PHOTO);
    const dbRequest = await ps.execute({
      id: options.params.idPhoto,
    });
    if (dbRequest.recordset.length === 0) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Photo does not exists',
        },
      };
    }
    log.info(dbRequest.rowsAffected, 'Photo was returned');
    const image = await downloadImage(dbRequest.recordset[0].blob_name);
    return {
      status: 200,
      data: photoFromRecord(dbRequest.recordset[0], image),
    };
  } catch (error) {
    log.error(error, 'Error getting photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting photo',
      },
    };
  }
};

type NullablePhoto = {
  [K in keyof Photo]: Photo[K] | null;
};

export const patchPhotoById = async (
  options: RequestOptions<NullablePhoto, { idLesion: number; idPhoto: number }>,
) => {
  try {
    const { status, data } = await getPhotobyId(options);
    if (status === 400) {
      return { status, data };
    }
    const photo = data as Photo;
    if (options.body.description != null) {
      photo.description = options.body.description;
    }
    if (options.body.name != null) {
      photo.name = options.body.name;
    }
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Updating photo');
    ps.input('id', sql.BigInt);
    ps.input('name', sql.VarChar);
    ps.input('description', sql.VarChar);
    await ps.prepare(UPDATE_PHOTO);
    const dbRequest = await ps.execute({
      id: options.params.idPhoto,
      name: photo.name,
      description: photo.description,
    });
    log.info(dbRequest.rowsAffected, 'Photo was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Updated successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error updating photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error updating photo',
      },
    };
  }
};

export const deletePhotoById = async (
  options: RequestOptions<unknown, { idPhoto: number; idLesion: number }>,
) => {
  try {
    const pool = await getDatabasePool();
    const ps = new sql.PreparedStatement(pool);
    log.info('Deleting photo');
    ps.input('id', sql.BigInt);
    await ps.prepare(DELETE_PHOTO);
    const dbRequest = await ps.execute({
      id: options.params.idPhoto,
    });
    log.info(dbRequest.rowsAffected, 'Photo was deleted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Deleted successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error deleting photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error deleting photo',
      },
    };
  }
};
