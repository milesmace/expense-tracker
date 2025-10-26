export type Res<T = object, E = Error> = {
  success: boolean;
  data?: T;
  error?: E;
  message?: string;
};
