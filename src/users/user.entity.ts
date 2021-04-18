import { Entity, Column, ObjectIdColumn, ObjectID, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;
}
