import { spawn } from 'child_process';
import readline from 'readline';
import {
  ActivateContextEvent,
  ActivateEvent,
  CompleteEvent,
  ContextEvent,
  PluginResponse,
  QuitEvent,
  Request,
  SearchEvent,
} from './types';

// PluginExt is the interface that plugins should implement
export interface PluginExt {
  name(): string;
  run(): void;
  search(query: string): void;
  activate(id: number): void;
  activate_context?(id: number, context: number): void;
  complete?(id: number): void;
  context?(id: number): void;
  exit?(): void;
  interrupt?(): void;
  quit?(id: number): void;
  respond_with?(response: PluginResponse): void;
  init_logging?(): void;
}

export class PopPlugin implements PluginExt {
  // The name of the plugin, used for logging, notifications, etc
  name(): string {
    return 'pop';
  }

  // Function that should be called to send a response to the Pop launcher frontend
  respond_with(response: PluginResponse): void {
    process.stdout.write(`${JSON.stringify(response)}\n`);
  }

  // Main function to run the plugin, reads from stdin and calls the appropriate methods (search, activate, etc)
  // This function should preferably not be overridden
  run(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', line => {
      try {
        const request: Request = JSON.parse(line) as Request;

        switch (request) {
          case 'Exit':
            this.exit?.();
            break;
          case 'Interrupt':
            this.interrupt?.();
            break;
          default:
            if ((request as ActivateEvent).Activate !== undefined) {
              this.activate((request as ActivateEvent).Activate);
            }
            if (
              (request as ActivateContextEvent).ActivateContext !== undefined
            ) {
              const { id, context } = (request as ActivateContextEvent)
                .ActivateContext;
              this.activate_context?.(id, context);
            }
            if ((request as CompleteEvent).Complete !== undefined) {
              this.complete?.((request as CompleteEvent).Complete);
            }
            if ((request as ContextEvent).Context !== undefined) {
              this.context?.((request as ContextEvent).Context);
            }
            if ((request as QuitEvent).Quit !== undefined) {
              this.quit?.((request as QuitEvent).Quit);
            }
            if ((request as SearchEvent).Search !== undefined) {
              this.search((request as SearchEvent).Search);
            }
        }
      } catch (err) {
        //
      }
    });
  }

  // Pop launcher related methods that should be overridden by the plugin
  search(query: string) {}
  activate(id: number) {}
  complete(id: number) {}
  context(id: number) {}
  activate_context?(id: number, context: number) {}
  exit() {}
  interrupt() {}
  quit(id: number) {}

  // Utility methods
  init_logging() {}

  log() {}

  show_notification(
    title: string,
    body: string,
    icon: string,
    timeout: number
  ) {
    const args = [
      'call',
      '--session',
      '--dest',
      'org.freedesktop.Notifications',
      '--object-path',
      '/org/freedesktop/Notifications',
      '--method',
      'org.freedesktop.Notifications.Notify',
      'Pop launcher plugin ' + this.name(),
      '0',
      icon,
      title,
      body,
      '[]',
      '{}',
      timeout.toString(),
    ];

    spawn('gdbus', args);
  }
}
