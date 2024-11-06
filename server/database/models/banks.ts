import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import  { Transactions } from './transactions';

export class Banks extends Model<
 Sequelize.InferAttributes<Banks>,
 Sequelize.InferCreationAttributes<Banks>
> {
   declare bankName?: string;
   declare bankCode?: string;
   declare id: number;
   declare createdAt?: Date;
   declare updatedAt?: Date;

   static initModel(sequelize: Sequelize.Sequelize): typeof Banks {
      return Banks.init({
      bankName: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'bank_name'
      },

      bankCode: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'bank_code'
      },

      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
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
      tableName: 'banks',
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
      ]
   });
   }

   // Banks hasMany Transactions via bankId
   declare transactions: Sequelize.NonAttribute<Transactions[]>;
   declare getTransactions: Sequelize.HasManyGetAssociationsMixin<Transactions>;
   declare setTransactions: Sequelize.HasManySetAssociationsMixin<Transactions, number>;
   declare addTransaction: Sequelize.HasManyAddAssociationMixin<Transactions, number>;
   declare addTransactions: Sequelize.HasManyAddAssociationsMixin<Transactions, number>;
   declare createTransaction: Sequelize.HasManyCreateAssociationMixin<Transactions>;
   declare removeTransaction: Sequelize.HasManyRemoveAssociationMixin<Transactions, number>;
   declare removeTransactions: Sequelize.HasManyRemoveAssociationsMixin<Transactions, number>;
   declare hasTransaction: Sequelize.HasManyHasAssociationMixin<Transactions, number>;
   declare hasTransactions: Sequelize.HasManyHasAssociationsMixin<Transactions, number>;
   declare countTransactions: Sequelize.HasManyCountAssociationsMixin;

}
