import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProductsTable1633532067044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isUnique: true,
                    },
                    {
                        name: 'price',
                        type: 'double precision',

                    },
                    {
                        name: 'image',
                        type: 'varchar'
                    },
                    {
                        name: 'brand',
                        type: 'varchar'
                    },
                    {
                        name: 'title',
                        type: 'varchar'
                    },
                    {
                        name: 'reviewScore',
                        type: 'int'
                    }
                ],
            })
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable('products');
    }

}
