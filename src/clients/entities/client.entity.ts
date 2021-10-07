import { type } from "os";
import { Product } from "src/clients/entities/product.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4} from 'uuid';

@Entity({name: 'clients'})
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @JoinTable({name: 'clients_products'})
    @ManyToMany(type => Product, product => product.clients, 
        {onDelete: 'CASCADE'}
    )
    products: Product[];

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
