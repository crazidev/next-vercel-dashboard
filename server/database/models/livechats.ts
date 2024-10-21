import * as Sequelize from 'sequelize';
import {
   CreationOptional,
   DataTypes,
   InferCreationAttributes, 
   InferAttributes,
   Model
} from 'sequelize';

import type { Users, UsersId } from './users';

export class Livechats extends Model<
      InferAttributes<Livechats>,
      InferCreationAttributes<Livechats>
> {
    declare id: CreationOptional<number>;
    declare userId?: number;
    declare fromAdmin?: number;
    declare message: string;
    declare type?: 'text' | 'image' | 'file';
    declare fileUrl?: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare usersId?: number;

   // Livechats belongsTo Users via userId
   declare user?: Sequelize.NonAttribute<Users>
   declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;
   // Livechats belongsTo Users via usersId
   declare usersUser?: Sequelize.NonAttribute<Users>
   declare getUsersUser: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setUsersUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createUsersUser: Sequelize.BelongsToCreateAssociationMixin<Users>;

   static initModel(sequelize: Sequelize.Sequelize): typeof Livechats {
      return Livechats.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'users',
            key: 'id'
         },
         field: 'user_id'
      },
      fromAdmin: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         field: 'from_admin'
      },
      message: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      type: {
         type: DataTypes.BLOB,
         allowNull: true
      },
      fileUrl: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'file_url'
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'created_at'
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'updated_at'
      },
      usersId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'users',
            key: 'id'
         },
         field: 'users_id'
      }
   }, {
      sequelize,
      tableName: 'livechats',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      indexes: [
         {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
               { name: "id" },
            ]
         },
         {
            name: "user_id",
            using: "BTREE",
            fields: [
               { name: "user_id" },
            ]
         },
         {
            name: "users_id",
            using: "BTREE",
            fields: [
               { name: "users_id" },
            ]
         },
      ]
   });
   }
}
