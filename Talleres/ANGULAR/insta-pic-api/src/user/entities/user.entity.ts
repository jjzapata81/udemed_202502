import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // Personalizar nombre de la tabla
export class User {
  @PrimaryGeneratedColumn('uuid') // El id se crea solo
  id: string;

  @Column({ unique: true, nullable: false }) // Puedo definir el tipo de dato, el nombre de la columna, si es único, etc.
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: false })
  avatarUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'created_at' })
  updateAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  preCreate() {
    this.name = this.name.toLowerCase();
  }
}
