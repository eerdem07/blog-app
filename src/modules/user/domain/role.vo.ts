export class Role {
  constructor(private readonly _value: string) {}

  static create(value: string) {
    const allowed = ['USER', 'ADMIN', 'MODERATOR'];

    if (!allowed.includes(value.toUpperCase())) {
      throw new Error(`Invalid role: ${value}`);
    }

    return new Role(value.toUpperCase());
  }

  static user(): Role {
    return new Role('USER');
  }

  static admin(): Role {
    return new Role('ADMIN');
  }

  static moderator(): Role {
    return new Role('MODERATOR');
  }

  get value(): string {
    return this._value;
  }

  equals(other: Role): boolean {
    return this._value === other._value;
  }
}
