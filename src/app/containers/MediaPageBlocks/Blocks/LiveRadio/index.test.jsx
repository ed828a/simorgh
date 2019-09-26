import React from 'react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import { RequestContext } from '#contexts/RequestContext';
import { suppressPropWarnings } from '#testHelpers';
import LiveRadio from '.';

const origin = 'http://localhost.bbc.co.uk:7080';

describe('MediaPageBlocks LiveRadio', () => {
  shouldMatchSnapshot(
    'should render correctly for canonical',
    <RequestContext.Provider value={{ platform: 'canonical', origin }}>
      <LiveRadio uuid="uuid" idAttr="idAttr" externalId="externalId" id="id" />
    </RequestContext.Provider>,
  );

  // TODO: remove the need for this suppressPropWarnings
  suppressPropWarnings(['placeholderSrc', 'undefined']);

  shouldMatchSnapshot(
    'should render correctly for amp',
    <RequestContext.Provider value={{ platform: 'amp', origin }}>
      <LiveRadio uuid="uuid" idAttr="idAttr" externalId="externalId" id="id" />
    </RequestContext.Provider>,
  );

  describe('when platform is unknown', () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar', origin }}>
        <LiveRadio
          uuid="uuid"
          idAttr="idAttr"
          externalId="externalId"
          id="id"
        />
      </RequestContext.Provider>,
    );
  });

  describe('when id isnt provided', () => {
    suppressPropWarnings(['id', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar', origin }}>
        <LiveRadio uuid="uuid" idAttr="idAttr" externalId="externalId" />
      </RequestContext.Provider>,
    );
  });

  describe('when externalId isnt provided', () => {
    suppressPropWarnings(['externalId', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar', origin }}>
        <LiveRadio uuid="uuid" idAttr="idAttr" id="id" />
      </RequestContext.Provider>,
    );
  });
});