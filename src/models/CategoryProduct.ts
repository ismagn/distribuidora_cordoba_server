import {Table,Column, Model, DataType, Default, HasMany} from 'sequelize-typescript' //son decoradores para indicar que parte de la base de datos es
import Product from './Porduct';

    @Table({
        tableName: 'categories'
    })

    class CategoryProduct extends Model{
        @Column({
            type: DataType.STRING(100)
        })
        declare name: string

        @HasMany(() => Product)
        products: Product[];
        
    }
    export default CategoryProduct