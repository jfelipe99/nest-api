import { table } from "console";
import { type } from "os";
import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class createAddClientIdToClientsProductsTable1633613885369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'clients_products',
            new TableColumn( {
                name: 'clientsId',
                type: 'uuid',
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
        'clients_products', 
        new TableForeignKey({
            name: 'clients_products_clients',
            columnNames: ['clientsId'],
            onDelete: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'clients'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('clients_products', 'clients_products_clients');
        await queryRunner.dropColumn('clients_products', 'clientsId');
    }

}
