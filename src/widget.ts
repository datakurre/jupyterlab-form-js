// Copyright (c) Asko Soukka
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';
import { Form } from '@bpmn-io/form-js-viewer';

// Import the CSS
import '../css/widget.css';
import '@bpmn-io/form-js-viewer/dist/assets/form-js.css';

export class FormJSViewerModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: FormJSViewerModel.model_name,
      _model_module: FormJSViewerModel.model_module,
      _model_module_version: FormJSViewerModel.model_module_version,
      _view_name: FormJSViewerModel.view_name,
      _view_module: FormJSViewerModel.view_module,
      _view_module_version: FormJSViewerModel.view_module_version,
      schema: {},
      data: {},
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'FormJSViewerModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'FormJSView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class FormJSView extends DOMWidgetView {
  form: Form | null = null;

  render() {
    this.form_changed();
    this.model.on('change:data', this.form_changed, this);
    this.model.on('change:schema', this.form_changed, this);
  }

  async form_changed() {
    const schema = this.model.get('schema');
    const data = this.model.get('data');
    if (this.form == null) {
      this.form = new Form({ container: this.el });
    }
    if (!!Object.keys(schema).length) {
      await this.form.importSchema(schema, data);
      this.form.on('submit', (event: any) => {
        this.send({
            ...event,
            event: 'submit',
        });
      });
    }
  }
}
