import * as Sequelize from 'sequelize';
import { DataTypes, Model, CreationOptional } from 'sequelize';
import  { Alert } from './alert';
import  { Livechats } from './livechats';
import  { Transactions } from './transactions';
import  { VerificationTokens } from './verification_tokens';
import  { WalletBalances } from './wallet_balances';

export class Users extends Model<
 Sequelize.InferAttributes<Users>,
 Sequelize.InferCreationAttributes<Users>
> {
   declare id: CreationOptional<number>;
   declare firstName: string;
   declare lastName: string;
   declare email?: string;
   declare phone?: string;
   declare emailVerified?: number;
   declare gender?: 'male' | 'female';
   declare ssn?: string;
   declare ssnStatus?: 'uploaded' | 'verified';
   declare idDoc?: string;
   declare idDocStatus?: 'uploaded' | 'verified';
   declare accountBalance?: number;
   declare state?: string;
   declare country?: string;
   declare address?: string;
   declare emailToken?: number;
   declare dateOfBirth?: string;
   declare hasDeposited?: number;
   declare password: string;
   declare idDocType?: 'national_id' | 'drivers_license' | 'international_passport';
   declare profileImg?: string;
   declare pin?: string;
   declare createdAt?: Date;
   declare updatedAt?: Date;
   declare accountLevel?: 'tier1' | 'tier2' | 'tier3';
   declare pushId?: string;
   declare lastSeen?: Date;
   declare status?: 'blocked' | 'active' | 'suspended';
   declare canTransfer?: number;
   declare isAdmin?: number;

   static initModel(sequelize: Sequelize.Sequelize): typeof Users {
      return Users.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },

      firstName: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: 'first_name'
      },

      lastName: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: 'last_name'
      },

      email: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      phone: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      emailVerified: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         field: 'email_verified'
      },

      gender: {
         type: DataTypes.ENUM('male','female'),
         allowNull: true
      },

      ssn: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      ssnStatus: {
         type: DataTypes.ENUM('uploaded','verified'),
         allowNull: true,
         field: 'ssn_status'
      },

      idDoc: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'id_doc'
      },

      idDocStatus: {
         type: DataTypes.ENUM('uploaded','verified'),
         allowNull: true,
         field: 'id_doc_status'
      },

      accountBalance: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'account_balance'
      },

      state: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      country: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      address: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      emailToken: {
         type: DataTypes.INTEGER,
         allowNull: true,
         field: 'email_token'
      },

      dateOfBirth: {
         type: DataTypes.DATEONLY,
         allowNull: true,
         field: 'date_of_birth'
      },

      hasDeposited: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         field: 'has_deposited'
      },

      password: {
         type: DataTypes.STRING(255),
         allowNull: false
      },

      idDocType: {
         type: DataTypes.ENUM('national_id','drivers_license','international_passport'),
         allowNull: true,
         field: 'id_doc_type'
      },

      profileImg: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'profile_img'
      },

      pin: {
         type: DataTypes.STRING(255),
         allowNull: true
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

      accountLevel: {
         type: DataTypes.ENUM('tier1','tier2','tier3'),
         allowNull: true,
         field: 'account_level'
      },

      pushId: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'push_id'
      },

      lastSeen: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'last_seen'
      },

      status: {
         type: DataTypes.ENUM('blocked','active','suspended'),
         allowNull: true,
         defaultValue: "active"
      },

      canTransfer: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: 0,
         field: 'can_transfer'
      },

      isAdmin: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: 0,
         field: 'is_admin'
      },
   }, {
      sequelize,
      tableName: 'users',
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

   // Users hasMany Alert via userId
   declare alerts: Sequelize.NonAttribute<Alert[]>;
   declare getAlerts: Sequelize.HasManyGetAssociationsMixin<Alert>;
   declare setAlerts: Sequelize.HasManySetAssociationsMixin<Alert, number>;
   declare addAlert: Sequelize.HasManyAddAssociationMixin<Alert, number>;
   declare addAlerts: Sequelize.HasManyAddAssociationsMixin<Alert, number>;
   declare createAlert: Sequelize.HasManyCreateAssociationMixin<Alert>;
   declare removeAlert: Sequelize.HasManyRemoveAssociationMixin<Alert, number>;
   declare removeAlerts: Sequelize.HasManyRemoveAssociationsMixin<Alert, number>;
   declare hasAlert: Sequelize.HasManyHasAssociationMixin<Alert, number>;
   declare hasAlerts: Sequelize.HasManyHasAssociationsMixin<Alert, number>;
   declare countAlerts: Sequelize.HasManyCountAssociationsMixin;

   // Users hasMany Livechats via userId
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

   // Users hasMany Livechats via usersId
   declare usersLivechats: Sequelize.NonAttribute<Livechats[]>;
   declare getUsersLivechats: Sequelize.HasManyGetAssociationsMixin<Livechats>;
   declare setUsersLivechats: Sequelize.HasManySetAssociationsMixin<Livechats, number>;
   declare addUsersLivechat: Sequelize.HasManyAddAssociationMixin<Livechats, number>;
   declare addUsersLivechats: Sequelize.HasManyAddAssociationsMixin<Livechats, number>;
   declare createUsersLivechat: Sequelize.HasManyCreateAssociationMixin<Livechats>;
   declare removeUsersLivechat: Sequelize.HasManyRemoveAssociationMixin<Livechats, number>;
   declare removeUsersLivechats: Sequelize.HasManyRemoveAssociationsMixin<Livechats, number>;
   declare hasUsersLivechat: Sequelize.HasManyHasAssociationMixin<Livechats, number>;
   declare hasUsersLivechats: Sequelize.HasManyHasAssociationsMixin<Livechats, number>;
   declare countUsersLivechats: Sequelize.HasManyCountAssociationsMixin;

   // Users hasMany Transactions via userId
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

   // Users hasMany Transactions via beneficiaryId
   declare beneficiaryTransactions: Sequelize.NonAttribute<Transactions[]>;
   declare getBeneficiaryTransactions: Sequelize.HasManyGetAssociationsMixin<Transactions>;
   declare setBeneficiaryTransactions: Sequelize.HasManySetAssociationsMixin<Transactions, number>;
   declare addBeneficiaryTransaction: Sequelize.HasManyAddAssociationMixin<Transactions, number>;
   declare addBeneficiaryTransactions: Sequelize.HasManyAddAssociationsMixin<Transactions, number>;
   declare createBeneficiaryTransaction: Sequelize.HasManyCreateAssociationMixin<Transactions>;
   declare removeBeneficiaryTransaction: Sequelize.HasManyRemoveAssociationMixin<Transactions, number>;
   declare removeBeneficiaryTransactions: Sequelize.HasManyRemoveAssociationsMixin<Transactions, number>;
   declare hasBeneficiaryTransaction: Sequelize.HasManyHasAssociationMixin<Transactions, number>;
   declare hasBeneficiaryTransactions: Sequelize.HasManyHasAssociationsMixin<Transactions, number>;
   declare countBeneficiaryTransactions: Sequelize.HasManyCountAssociationsMixin;

   // Users hasMany VerificationTokens via userId
   declare verificationTokens: Sequelize.NonAttribute<VerificationTokens[]>;
   declare getVerificationTokens: Sequelize.HasManyGetAssociationsMixin<VerificationTokens>;
   declare setVerificationTokens: Sequelize.HasManySetAssociationsMixin<VerificationTokens, number>;
   declare addVerificationToken: Sequelize.HasManyAddAssociationMixin<VerificationTokens, number>;
   declare addVerificationTokens: Sequelize.HasManyAddAssociationsMixin<VerificationTokens, number>;
   declare createVerificationToken: Sequelize.HasManyCreateAssociationMixin<VerificationTokens>;
   declare removeVerificationToken: Sequelize.HasManyRemoveAssociationMixin<VerificationTokens, number>;
   declare removeVerificationTokens: Sequelize.HasManyRemoveAssociationsMixin<VerificationTokens, number>;
   declare hasVerificationToken: Sequelize.HasManyHasAssociationMixin<VerificationTokens, number>;
   declare hasVerificationTokens: Sequelize.HasManyHasAssociationsMixin<VerificationTokens, number>;
   declare countVerificationTokens: Sequelize.HasManyCountAssociationsMixin;

   // Users hasMany WalletBalances via userId
   declare walletBalances: Sequelize.NonAttribute<WalletBalances[]>;
   declare getWalletBalances: Sequelize.HasManyGetAssociationsMixin<WalletBalances>;
   declare setWalletBalances: Sequelize.HasManySetAssociationsMixin<WalletBalances, number>;
   declare addWalletBalance: Sequelize.HasManyAddAssociationMixin<WalletBalances, number>;
   declare addWalletBalances: Sequelize.HasManyAddAssociationsMixin<WalletBalances, number>;
   declare createWalletBalance: Sequelize.HasManyCreateAssociationMixin<WalletBalances>;
   declare removeWalletBalance: Sequelize.HasManyRemoveAssociationMixin<WalletBalances, number>;
   declare removeWalletBalances: Sequelize.HasManyRemoveAssociationsMixin<WalletBalances, number>;
   declare hasWalletBalance: Sequelize.HasManyHasAssociationMixin<WalletBalances, number>;
   declare hasWalletBalances: Sequelize.HasManyHasAssociationsMixin<WalletBalances, number>;
   declare countWalletBalances: Sequelize.HasManyCountAssociationsMixin;

}
