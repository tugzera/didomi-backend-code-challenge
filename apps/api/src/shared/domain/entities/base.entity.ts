import { randomUUID } from 'crypto';

export class BaseEntity {
  id: string;
  alternativeId: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(props: Partial<BaseEntity> = {}) {
    this.id = props.id || randomUUID();
    this.alternativeId = props.alternativeId || 0;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || null;
    this.deletedAt = props.deletedAt || null;
  }
}
