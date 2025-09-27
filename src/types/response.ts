export type Res<T = object> = {
  /** A boolean to indicate if the response is a success or not */
  success: boolean;
  /** Response Data if success, or else error message string */
  data: string | T;
};
