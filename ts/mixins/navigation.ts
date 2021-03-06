/**
 *
 *  (c) 2010-2018 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/**
 * Internal types
 * @private
 */
declare global {
    namespace Highcharts {
        interface Chart {
            navigation?: ChartNavigationObject;
        }
        interface ChartNavigationMixin {
            addUpdate(update: Function, chart: Chart): void;
            initUpdate(chart: Chart): void;
        }
        interface ChartNavigationObject {
            updates: Array<ChartNavigationUpdateObject>;
            update(options: NavigationOptions, redraw?: boolean): void;
        }
        interface ChartNavigationUpdateFunction {
            (
                this: NavigationChart,
                options: NavigationOptions,
                redraw?: boolean
            ): void;
        }
        interface ChartNavigationUpdateObject {
            context: NavigationChart;
            update: ChartNavigationUpdateFunction;
        }
        class NavigationChart extends Chart {
            public addUpdate: ChartNavigationMixin['addUpdate'];
            public initUpdate: ChartNavigationMixin['initUpdate'];
            public navigation: ChartNavigationObject;
        }
    }
}

var chartNavigation: Highcharts.ChartNavigationMixin = {
    /**
     * Initializes `chart.navigation` object which delegates `update()` methods
     * to all other common classes (used in exporting and navigationBindings).
     *
     * @private
     * @param {Highcharts.Chart} chart
     *        The chart instance.
     * @return {void}
     */
    initUpdate: function (chart: Highcharts.Chart): void {
        if (!chart.navigation) {
            chart.navigation = {
                updates: [],
                update: function (options, redraw?: boolean): void {
                    this.updates.forEach(function (
                        updateConfig: Highcharts.ChartNavigationUpdateObject
                    ): void {
                        updateConfig.update.call(
                            updateConfig.context,
                            options,
                            redraw
                        );
                    });
                }
            };
        }
    },
    /**
     * Registers an `update()` method in the `chart.navigation` object.
     *
     * @private
     * @param {Highcharts.ChartNavigationUpdateFunction} update
     *        The `update()` method that will be called in `chart.update()`.
     * @param {Highcharts.Chart} chart
     *        The chart instance. `update()` will use that as a context
     *        (`this`).
     * @return {void}
     */
    addUpdate: function (
        update: Highcharts.ChartNavigationUpdateFunction,
        chart: Highcharts.NavigationChart
    ): void {
        if (!chart.navigation) {
            this.initUpdate(chart);
        }
        chart.navigation.updates.push({
            update: update,
            context: chart
        });
    }
};

export default chartNavigation;
