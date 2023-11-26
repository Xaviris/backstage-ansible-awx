import { createRouteRef, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

const rootRouteRef = createRouteRef({
  id: "ansible-awx"
});

const ansibleAwxPlugin = createPlugin({
  id: "ansible-awx",
  routes: {
    root: rootRouteRef
  }
});
const EntityAWXPage = ansibleAwxPlugin.provide(
  createRoutableExtension({
    name: "EntityAWXPage",
    component: () => import('./esm/index-f85d1e43.esm.js').then((m) => m.EntityAWXContent),
    mountPoint: rootRouteRef
  })
);

export { EntityAWXPage, ansibleAwxPlugin };
//# sourceMappingURL=index.esm.js.map
