
import { teamFilter } from '../../selectors/team-selector';

export default class TotalGoalsScoreController {
  constructor($ngRedux, $scope) {
    this.totalGoals = null;

    let _onChange = (state) => {
      return {
        totalGoals: teamFilter(state).reduce((acc, elem) => {
          return acc + elem.get('goals');
        }, 0)
      };
    };

    let disconnect = $ngRedux.connect(_onChange)(this);
    $scope.$on('$destroy', () => disconnect());

  }
};


TotalGoalsScoreController.$inject = ['$ngRedux', '$scope'];
