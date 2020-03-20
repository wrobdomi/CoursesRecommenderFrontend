export class User {
  constructor(public userId: string, private _authToken: string) {}

  get authToken() {
    return this._authToken;
  }

}
