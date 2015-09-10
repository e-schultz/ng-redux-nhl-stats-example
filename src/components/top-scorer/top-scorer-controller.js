import R from 'ramda';
import { teamFilter } from '../../selectors/team-selector';

export default class TopScorerController {
  constructor($ngRedux, $scope) {
    this.statsData = [];

    let _onChange = (state) => {
      return {
        statsData: this.getTopScorers(15)(teamFilter(state).toJS())
      };
    };

    let disconnect = $ngRedux.connect(_onChange)(this);
    $scope.$on('$destroy', () => disconnect());
  }

  getTopScorers(count) {
    return R.pipe(
      R.sort((a, b) => b.goals - a.goals),
      R.take(count)
    );
  }
};

TopScorerController.$inject = ['$ngRedux', '$scope'];
