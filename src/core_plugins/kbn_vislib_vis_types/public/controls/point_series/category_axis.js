/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
