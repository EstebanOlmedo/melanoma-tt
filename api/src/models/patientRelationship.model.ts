import { Model, Table, ForeignKey, Column } from 'sequelize-typescript';
import User from './user.model';
import Lesion from './lesion.model';

@Table
export default class PatientRelationship extends Model {
  @ForeignKey(() => User)
  @Column
    doctorId!: number;

  @ForeignKey(() => Lesion)
  @Column
    lesionId!: number;

  @Column
    patientId!: number;
}
