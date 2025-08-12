import { Color } from "@tremor/react";
import { ReactNode } from "react";

export interface PickoCardTypes {
  domain: string;
  children: ReactNode;
}

export interface PickoSparkTypes {
  color: Color;
}

export interface PickoLiveTypes {
  color: Color;
}

export interface PickoHistoryTypes {
  color: {
    positive: Color;
    negative: Color;
  };
}
