import R from 'ramda';
import { teamFilter } from '../../selectors/team-selector';
// TODO: refactor teamFilter to be injectable
export default class TopPointsController {
  constructor($ngRedux, $scope) {
    this.statsData = [];

    let _onChange = (state) => {
      // TODO: clean this up
      return {
        statsData: this.getTopPoints(15)(teamFilter(state).toJS())
      };
    };

    let disconnect = $ngRedux.connect(_onChange)(this);

    $scope.$on('$destroy', () => disconnect());
    
  }

  getTopPoints(count) {
    return R.pipe(
      R.sort((a, b) => b.points - a.points),
      R.take(count)
    );
  }
};

TopPointsController.$inject = ['$ngRedux', '$scope'];
