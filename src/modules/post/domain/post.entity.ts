export class Post {
  constructor(
    private _title: string,
    private _content: string,
    private _authorId: string,
    private _id?: string,
    private createdAt?: Date,
    private updatedAt?: string,
  ) {}

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get authorId(): string {
    return this._authorId;
  }

  get id(): string | undefined {
    return this._id;
  }
}
