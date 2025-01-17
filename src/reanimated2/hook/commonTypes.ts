'use strict';
import type { Component } from 'react';
import type { __Context, ShadowNodeWrapper } from '../commonTypes';
import type {
  ImageStyle,
  NativeSyntheticEvent,
  TextStyle,
  ViewStyle,
  NativeScrollEvent,
} from 'react-native';

export type DependencyList = Array<unknown> | undefined;

export interface ContextWithDependencies<TContext extends __Context> {
  context: TContext;
  savedDependencies: DependencyList;
}

export interface Descriptor {
  tag: number;
  name: string;
  shadowNodeWrapper: ShadowNodeWrapper;
}

export interface AnimatedRef<T extends Component> {
  current: T | null;
  (component?: T):
    | number // Paper
    | ShadowNodeWrapper // Fabric
    | HTMLElement; // web
}

type ReanimatedPayload = {
  eventName: string;
};

/**
 * This utility type is to convert type of events that would normally be
 * sent by React Native (they have `nativeEvent` field) to the type
 * that is sent by Reanimated.
 */
export type ReanimatedEvent<Event extends object> = ReanimatedPayload &
  (Event extends {
    nativeEvent: infer NativeEvent extends object;
  }
    ? NativeEvent
    : Event);

// ts-prune-ignore-next It will be used in the following PRs.
export type EventPayload<Event extends object> = Event extends {
  nativeEvent: infer NativeEvent extends object;
}
  ? NativeEvent
  : Omit<Event, 'eventName'>;

// ts-prune-ignore-next It will be used in the following PRs.
export type NativeEventWrapper<Event extends object> = {
  nativeEvent: Event;
};

export type DefaultStyle = ViewStyle | ImageStyle | TextStyle;

// ts-prune-ignore-next It will be used in the following PRs.
export type RNNativeScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export type ReanimatedScrollEvent = ReanimatedEvent<RNNativeScrollEvent>;
