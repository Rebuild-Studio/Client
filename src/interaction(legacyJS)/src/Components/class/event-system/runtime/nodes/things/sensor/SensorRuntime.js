import MaterialSensorProcess from './MaterialSensorProcess';
import SensorProcess from './SensorProcess';
import { ControlType } from '../../../../NodeControl';
import { extractKeyFormat, generateKeyFormat } from '../../../utils';
import ThingRuntime from '../ThingRuntime';

export default class SensorRuntime extends ThingRuntime {
  constructor(args) {
    super(args);
    this.outputKeys.forEach((key) => {
      if (key.includes(generateKeyFormat(undefined, ControlType.Material))) {
        this.processes.push(
          new MaterialSensorProcess(
            this,
            key,
            extractKeyFormat(key, ControlType.Material)
          )
        );
      } else {
        this.processes.push(new SensorProcess(this, key));
      }
    });
  }
}
