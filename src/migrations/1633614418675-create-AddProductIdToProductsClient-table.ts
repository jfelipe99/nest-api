import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class createAddProductIdToProductsClientTable1633614418675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'clients_products',
            new TableColumn( {
                name: 'productsId',
                type: 'uuid',
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
        'clients_products', 
        new TableForeignKey({
            name: 'clients_products_products',
            columnNames: ['productsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('clients_products', 'clients_products_products');
        await queryRunner.dropColumn('clients_products', 'productsId');
    }

}
