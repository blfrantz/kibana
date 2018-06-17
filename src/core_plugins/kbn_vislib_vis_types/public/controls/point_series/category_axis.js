import _ from 'lodash';
import { uiModules } from 'ui/modules';
import vislibValueAxesTemplate from './category_axis.html';
const module = uiModules.get('kibana');

module.directive('vislibCategoryAxis', function () {
  return {
    restrict: 'E',
    template: vislibValueAxesTemplate,
    replace: true,
    link: function ($scope) {
      $scope.rotateOptions = [
        { name: 'horizontal', value: 0 },
        { name: 'vertical', value: 90 },
        { name: 'angled', value: 75 },
      ];

      $scope.xAxis = null;

      if (_.isUndefined($scope.vis.params.categoryAxes[0].buckets)) {
        $scope.vis.params.categoryAxes[0].buckets = {
          noPartial: false
        };
      }

      $scope.$watch('vis.aggs', aggs => {
        $scope.xAxis = _.find(aggs, { __schema: { title: 'X-Axis' } });
      });

      $scope.$watch('xAxis.__type.name', name => {
        $scope.showBucketOptions = name === 'date_histogram';
        if (!$scope.showBucketOptions) {
          $scope.vis.params.categoryAxes[0].buckets.noPartial = false;
        }
      });
    }
  };
});
