// PluginResponse Types
type GpuPreference = 'Default' | 'NonDefault';
type IconSource = { Name: string } | { Mime: string };

type ContextOption = {
  id: number;
  name: string;
};

export type PluginSearchResult = {
  id: number;
  name: string;
  description: string;
  keywords: Array<string> | null;
  icon: IconSource | null;
  exec: string | null;
  window: [number, number] | null;
};

export type PluginResponse =
  | { Append: PluginSearchResult }
  | { Context: { id: number; options: Array<ContextOption> } }
  | { DesktopEntry: { path: string; gpu_preference: GpuPreference } }
  | { Fill: string }
  | 'Clear'
  | 'Close'
  | 'Finished';

// Event types
type ExitEvent = 'Exit';
type InterruptEvent = 'Interrupt';

export interface ActivateEvent {
  Activate: number;
}
export interface CompleteEvent {
  Complete: number;
}
export interface ContextEvent {
  Context: number;
}
export interface QuitEvent {
  Quit: number;
}
export interface SearchEvent {
  Search: string;
}

export interface ActivateContextEvent {
  ActivateContext: {
    id: number;
    context: number;
  };
}

export type Request =
  | ActivateEvent
  | ActivateContextEvent
  | CompleteEvent
  | ContextEvent
  | ExitEvent
  | InterruptEvent
  | QuitEvent
  | SearchEvent;
