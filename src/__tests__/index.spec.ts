// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// Add any needed widget imports here (or from controls)
// import {} from '@jupyter-widgets/base';

import { createTestModel } from './utils';

import { FormJSViewerModel } from '..';

describe('Form', () => {
  describe('FormJSViewerModel', () => {
    it('should be createable', () => {
      const model = createTestModel(FormJSViewerModel);
      expect(model).toBeInstanceOf(FormJSViewerModel);
      expect(model.get('schema')).toEqual('null');
      expect(model.get('data')).toEqual('null');
    });

    it('should be createable with a value', () => {
      const state = { data: '{}' };
      const model = createTestModel(FormJSViewerModel, state);
      expect(model).toBeInstanceOf(FormJSViewerModel);
      expect(model.get('data')).toEqual('{}');
    });
  });
});
