import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export class Versions extends Model<
 Sequelize.InferAttributes<Versions>,
 Sequelize.InferCreationAttributes<Versions>
> {
   declare id: number;
   declare version?: string;
   declare status?: 'active' | 'inactive';

   static initModel(sequelize: Sequelize.Sequelize): typeof Versions {
      return Versions.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      version: {
         type: DataTypes.TEXT,
         allowNull: true
      },

      status: {
         type: DataTypes.ENUM('active','inactive'),
         allowNull: true,
         defaultValue: "active"
      },
   }, {
      sequelize,
      tableName: 'versions',
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

}
