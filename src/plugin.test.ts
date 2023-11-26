import { ansibleAwxPlugin } from './plugin';

describe('ansible-awx', () => {
  it('should export plugin', () => {
    expect(ansibleAwxPlugin).toBeDefined();
  });
});
