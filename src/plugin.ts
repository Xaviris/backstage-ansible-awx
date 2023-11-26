import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const ansibleAwxPlugin = createPlugin({
  id: 'ansible-awx',
  routes: {
    root: rootRouteRef,
  },
});

export const EntityAWXPage = ansibleAwxPlugin.provide(
  createRoutableExtension({
    name: 'EntityAWXPage',
    component: () =>
      import('./components/AnsibleAWXComponent').then(m => m.EntityAWXContent),
    mountPoint: rootRouteRef,
  }),
);
