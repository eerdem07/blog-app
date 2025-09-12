export class Role {
  constructor(private readonly _value: string) {
    const allowed = ['USER', 'ADMIN', 'MODERATOR'];

    if (!allowed.includes(_value.toUpperCase())) {
      throw new Error(`Invalid role: ${_value}`);
    }

    this._value = _value.toUpperCase();
  }

  get value(): string {
    return this._value;
  }

  equals(other: Role): boolean {
    return this._value === other._value;
  }
}
