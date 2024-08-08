import { driver } from "driver.js";
import type { DriveStep, Driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { App } from "vue";
import { nextTick } from "vue";

interface DriverType {
    steps: DriveStep[],
    driver?: Driver,
    showProgress: boolean
}

let vue_driver: DriverType = {
    showProgress: false,
    steps: [],
};

vue_driver.steps = [];

const vueDriver = (app: App, options: { showProgress: boolean }): void => {
    vue_driver.driver = driver()
    app.directive('driver-step', (el, binding) => {
        let step = {
            element: binding.value.element,
            popover: {
                ...(binding.value ? (binding.value.popover || {}) : {})
            }
        };

        const stepExists = vue_driver.steps.find((vd) => vd.element === binding.value.element);
        if (stepExists) {
            vue_driver.steps = vue_driver.steps.filter((vd) => vd.element !== stepExists?.element);
            return console.warn('Please provide a unique name for your HTML element!')
        } else {
            vue_driver.steps.push(step);
            vue_driver.driver?.setConfig({
                showProgress: options.showProgress
            })
            vue_driver.driver?.setSteps([...vue_driver.steps]);
        }
        if (binding.value && binding.value.onclick === true) {
            el.onclick = (event: Event) => vue_driver.driver?.highlight(step)
        }
    });

    app.config.globalProperties.vueDriver = vue_driver.driver;
    app.config.globalProperties.driverStartTour = (index: number) => {
        nextTick(() => {
            vue_driver.driver?.setSteps([...vue_driver.steps]);
            vue_driver.driver?.drive(index)
        })
    }
}

export default vueDriver