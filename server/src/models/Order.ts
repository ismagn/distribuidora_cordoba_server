import { EnumDataType } from 'sequelize'
import {Table,Column, Model, DataType, Default, AllowNull, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript' //son decoradores para indicar que parte de la base de datos es
import User from './User';
import Product from './Porduct';

    @Table({
        tableName: 'orders'
    })

    class Order extends Model{
        @Column({
            type: DataType.JSONB
        })  
        declare products : object[];

        @ForeignKey(() => User )
        @Column({
            type: DataType.INTEGER
        })
        declare userId: number;

        @BelongsTo(() => User)
        user: User;

        @Column({
            type: DataType.FLOAT
        })  
        declare totalOrder : number

        @Default(0)
        @Column({
            type: DataType.INTEGER
        })  
        declare state : number
    }
    export default Order