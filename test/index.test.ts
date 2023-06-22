import { PopPlugin, PluginResponse } from '../src';

describe('PopPlugin', () => {
  let popPlugin: PopPlugin;

  beforeEach(() => {
    popPlugin = new PopPlugin();
  });

  it('should return the plugin name', () => {
    expect(popPlugin.name()).toBe('pop');
  });

  describe('run', () => {});

  describe('respond_with', () => {
    let mockStdout: jest.SpyInstance;

    beforeEach(() => {
      mockStdout = jest.spyOn(process.stdout, 'write');
      mockStdout.mockImplementation(() => true);
    });

    afterEach(() => {
      mockStdout.mockRestore();
    });

    it('should write the response to stdout', () => {
      const response: PluginResponse = {
        Append: {
          id: 1,
          name: 'test',
          description: 'test description',
          keywords: ['test'],
          icon: { Name: 'test-icon' },
          exec: 'test',
          window: [100, 100],
        },
      };
      popPlugin.respond_with(response);
      expect(mockStdout).toHaveBeenCalledWith(`${JSON.stringify(response)}\n`);
    });
  });
});
