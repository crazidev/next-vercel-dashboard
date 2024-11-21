import * as Sequelize from 'sequelize';
import { DataTypes, Model, CreationOptional } from 'sequelize';
import  { LivechatSession } from './livechat_session';

export class Livechats extends Model<
 Sequelize.InferAttributes<Livechats>,
 Sequelize.InferCreationAttributes<Livechats>
> {
   declare id: CreationOptional<number>;
   declare fromAdmin?: number;
   declare message: string;
   declare type?: 'text' | 'image' | 'file';
   declare fileUrl?: string;
   declare createdAt?: Date;
   declare updatedAt?: Date;
   declare sessionId?: number;

   static initModel(sequelize: Sequelize.Sequelize): typeof Livechats {
      return Livechats.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true
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

      sessionId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: 'livechat_session',
            key: 'id'
         },
         field: 'session_id'
      },
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
            name: "session_id",
            using: "BTREE",
            fields: [
               { name: "session_id" },
            ]
         },
      ]
   });
   }

   // Livechats belongsTo LivechatSession via sessionId
   declare session?: LivechatSession;
   declare getSession: Sequelize.BelongsToGetAssociationMixin<LivechatSession>;
   declare setSession: Sequelize.BelongsToSetAssociationMixin<LivechatSession, number>;
   declare createSession: Sequelize.BelongsToCreateAssociationMixin<LivechatSession>;

}
