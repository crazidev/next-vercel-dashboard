import * as Sequelize from 'sequelize';
import { DataTypes, Model, CreationOptional } from 'sequelize';
import  { Users } from './users';

export class Alert extends Model<
 Sequelize.InferAttributes<Alert>,
 Sequelize.InferCreationAttributes<Alert>
> {
   declare id: CreationOptional<number>;
   declare userId?: number;
   declare type: 'warning' | 'error' | 'info';
   declare title: string;
   declare message: string;
   declare startAt?: Date;
   declare endAt?: Date;

   static initModel(sequelize: Sequelize.Sequelize): typeof Alert {
      return Alert.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
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

      type: {
         type: DataTypes.ENUM('warning','error','info'),
         allowNull: false,
         defaultValue: "info"
      },

      title: {
         type: DataTypes.STRING(100),
         allowNull: false
      },

      message: {
         type: DataTypes.TEXT,
         allowNull: false
      },

      startAt: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
         field: 'start_at'
      },

      endAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'end_at'
      },
   }, {
      sequelize,
      tableName: 'alert',
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
      ]
   });
   }

   // Alert belongsTo Users via userId
   declare user?: Users;
   declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;

}
