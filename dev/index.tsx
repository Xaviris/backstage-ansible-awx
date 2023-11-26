import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { ansibleAwxPlugin, EntityAWXPage } from '../src/plugin';

createDevApp()
  .registerPlugin(ansibleAwxPlugin)
  .addPage({
    element: <EntityAWXPage />,
    title: 'Root Page',
    path: '/ansible-awx'
  })
  .render();
