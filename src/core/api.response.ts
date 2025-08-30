export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T;

  constructor(data: T, message: string = 'Success', success: boolean = true) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
