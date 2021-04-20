import { Entity, Column, ObjectIdColumn, ObjectID, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;
}
