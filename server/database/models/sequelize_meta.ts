import * as Sequelize from 'sequelize';
import { DataTypes, Model, CreationOptional } from 'sequelize';

export class SequelizeMeta extends Model<
 Sequelize.InferAttributes<SequelizeMeta>,
 Sequelize.InferCreationAttributes<SequelizeMeta>
> {
   declare name: CreationOptional<string>;

   static initModel(sequelize: Sequelize.Sequelize): typeof SequelizeMeta {
      return SequelizeMeta.init({
      name: {
         type: DataTypes.STRING(255),
         allowNull: false,
         primaryKey: true
      },
   }, {
      sequelize,
      tableName: 'SequelizeMeta',
      schema: 'public',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      indexes: [
         {
            name: "SequelizeMeta_pkey",
            unique: true,
            fields: [
               { name: "name" },
            ]
         },
      ]
   });
   }

}
