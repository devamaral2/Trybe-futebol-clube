import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './team';
// import OtherModel from './OtherModel';

class Match extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam', as: 'homeMatches',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeam', as: 'awayMatches',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeam', as: 'teamHome',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Match;
