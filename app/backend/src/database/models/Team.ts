import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public teamName: string;
}

Team.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Team;
