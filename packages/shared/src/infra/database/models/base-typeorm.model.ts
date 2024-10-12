import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseTypeormModel extends BaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column({ type: 'bigint', name: 'alternative_id', generated: 'increment' })
  alternativeId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
