import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import  { Users } from './users';

export class VerificationTokens extends Model<
 Sequelize.InferAttributes<VerificationTokens>,
 Sequelize.InferCreationAttributes<VerificationTokens>
> {
   declare id: number;
   declare userId?: number;
   declare token?: string;
   declare expiresAt?: Date;
   declare createdAt?: Date;
   declare updatedAt?: Date;

   static initModel(sequelize: Sequelize.Sequelize): typeof VerificationTokens {
      return VerificationTokens.init({
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

      token: {
         type: DataTypes.STRING(6),
         allowNull: true
      },

      expiresAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'expires_at'
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
   }, {
      sequelize,
      tableName: 'verification_tokens',
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
            name: "id",
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

   // VerificationTokens belongsTo Users via userId
   declare user?: Users;
   declare getUser: Sequelize.BelongsToGetAssociationMixin<Users>;
   declare setUser: Sequelize.BelongsToSetAssociationMixin<Users, number>;
   declare createUser: Sequelize.BelongsToCreateAssociationMixin<Users>;

}
