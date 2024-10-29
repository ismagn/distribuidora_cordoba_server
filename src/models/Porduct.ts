import { EnumDataType } from 'sequelize'
import {Table,Column, Model, DataType, Default, AllowNull, ForeignKey, BelongsTo, NotNull, PrimaryKey} from 'sequelize-typescript' //son decoradores para indicar que parte de la base de datos es
import CategoryProduct from './CategoryProduct'
import { UUIDV4 } from 'sequelize'
import { UUIDV1 } from 'sequelize'

    @Table({
        tableName: 'products'
    })

    class Product extends Model{
        @Default(UUIDV1)
        @Column({
            type: DataType.STRING,
            primaryKey: true
        })
        declare id: string

        @Column({
            type: DataType.STRING(100)
        })
        declare name: string

        @Column({
            type: DataType.FLOAT(5,2)
        })
        declare price: number

        @Column({
            type: DataType.STRING(500)
        })
        declare description: string

        
        @ForeignKey(() => CategoryProduct)
        @Column({
            type: DataType.INTEGER,
            allowNull: true
        })
        declare categoryId: number;

        @BelongsTo(() => CategoryProduct) // Un producto pertenece a una categoría
        category: CategoryProduct;
        
        @Column({
            type: DataType.INTEGER
        })
        declare cuantity: number

        @Column({
            type: DataType.STRING(500), // Cambia esto a STRING si solo almacenas la ruta del archivo
        
        })
        image: string;

        @Default(true) //por defecto el valor sera true si no se manda nada n el request
        @Column({
            type: DataType.BOOLEAN
        })
        declare availability: boolean
    }
    export default Product