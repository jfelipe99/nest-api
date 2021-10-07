import { IsNotIn } from "class-validator";
import { type } from "os";
import { Client } from "src/clients/entities/client.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4} from 'uuid';

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    brand: string;

    @Column()
    title: string;

    @Column()
    reviewScore: number;   
    
    @ManyToMany(type => Client, client => client.products)
    clients: Client[];

    @BeforeInsert()
    generatedId()
    {
        if(this.id)
        {
            return;
        }

        this.id = uuidv4()
    }

}
