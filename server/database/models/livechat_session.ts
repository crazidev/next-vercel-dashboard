import * as Sequelize from 'sequelize';
import { DataTypes, Model, CreationOptional } from 'sequelize';
import  { Livechats } from './livechats';

export class LivechatSession extends Model<
 Sequelize.InferAttributes<LivechatSession>,
 Sequelize.InferCreationAttributes<LivechatSession>
> {
   declare id: CreationOptional<number>;
   declare userId: number;
   declare customerName?: string;
   declare customerEmail?: string;
   declare createdAt: Date;

   static initModel(sequelize: Sequelize.Sequelize): typeof LivechatSession {
      return LivechatSession.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      userId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         field: 'user_id'
      },

      customerName: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'customer_name'
      },

      customerEmail: {
         type: DataTypes.TEXT,
         allowNull: true,
         field: 'customer_email'
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: Sequelize.NOW
      },
   }, {
      sequelize,
      tableName: 'livechat_session',
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
      ]
   });
   }

   // LivechatSession hasMany Livechats via sessionId
   declare livechats: Sequelize.NonAttribute<Livechats[]>;
   declare getLivechats: Sequelize.HasManyGetAssociationsMixin<Livechats>;
   declare setLivechats: Sequelize.HasManySetAssociationsMixin<Livechats, number>;
   declare addLivechat: Sequelize.HasManyAddAssociationMixin<Livechats, number>;
   declare addLivechats: Sequelize.HasManyAddAssociationsMixin<Livechats, number>;
   declare createLivechat: Sequelize.HasManyCreateAssociationMixin<Livechats>;
   declare removeLivechat: Sequelize.HasManyRemoveAssociationMixin<Livechats, number>;
   declare removeLivechats: Sequelize.HasManyRemoveAssociationsMixin<Livechats, number>;
   declare hasLivechat: Sequelize.HasManyHasAssociationMixin<Livechats, number>;
   declare hasLivechats: Sequelize.HasManyHasAssociationsMixin<Livechats, number>;
   declare countLivechats: Sequelize.HasManyCountAssociationsMixin;

}
