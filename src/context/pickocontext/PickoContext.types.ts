import { Color } from "@tremor/react";

export interface PickoContextProps {
  client: PickoClient;
  domain: PickoDomain;
  data: PickoAPIResponse | null;
}

export interface PickoProviderProps {
  children: React.ReactNode;
}

export interface PickoAPIResponse {
  is_subscribe: boolean;
  is_authenticated: boolean;
  x_signature: string;
  request_size: number;
  data: PickoDomainStats[] | PickoDomainStats;
}

export interface PickoDomainStats {
  _id: string;
  name: string;
  endpoint: string;
  active: boolean;
  disabled: boolean;
  last_ping: boolean;
  score: number;
  state: PickoAPIState;
  stats: {
    history: PickoStatsHistory[];
    live: PickoSpark[];
    tracker: PickoStatsTracker[];
  };
}

export interface PickoStatsTracker {
  color: Color;
  tooltip: PickoTooltip;
}

export interface PickoSpark {
  day: string;
  state: PickoAPIState;
  delay: number;
}

export interface PickoStatsHistory {
  day: string;
  active: number;
  inactive: number;
  empty: number;
}

export type PickoClient = string | null;
export type PickoDomain = string | string[] | null;
export type PickoAPIState = "state.up" | "state.down" | "state.dead";
export type PickoTooltip = "Up" | "Error" | "Unavailable";
