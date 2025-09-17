export type Res<T = object> = {
  success: boolean;
  data: string | T;
};
