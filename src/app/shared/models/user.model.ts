export class UserModel {
  name?: string;
  username?: string;
  token?: string;
  constructor(value: any) {
    Object.assign(this, value);
  }
}
