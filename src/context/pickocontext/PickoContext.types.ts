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
}

export type PickoClient = string | null;
export type PickoDomain = string | string[] | null;
export type PickoAPIState = "state.up" | "state.down" | "state.down";
