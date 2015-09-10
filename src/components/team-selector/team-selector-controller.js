import R from 'ramda';

export default class TeamSelectorController {
  constructor($ngRedux, filterActions, $scope) {
    
    this.filterActions = filterActions;
    // TODO: refactor this out into a selector?
    let _onChange = (state) => {
      return {
        teams: R.pipe(
          R.map(player => player.playerTeamsPlayedFor.split(', ')),
          R.flatten,
          R.uniq
        )(state.stats.toJS().dataset),
        activeTeam: state.filters.get('team')
      };
    };

    const disconnect = $ngRedux.connect(_onChange)(this);
    $scope.$on('$destroy', () => disconnect());
  }

  addFilter(team) {
    this.filterActions.addFilter('team', team);
  }
}

TeamSelectorController.$inject = ['$ngRedux', 'filterActions', '$scope'];
