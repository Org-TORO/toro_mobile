
export default interface SuccessResponse<T> {
  message: string;
  data: T;
  timestamp: string;
}