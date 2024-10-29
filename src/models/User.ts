import {Table,Column, Model, DataType, Default, AllowNull, HasMany, BeforeCreate, BeforeUpdate} from 'sequelize-typescript' //son decoradores para indicar que parte de la base de datos es
import Order from './Order'
import bcrypt from 'bcrypt';



    @Table({
        tableName: 'users'
    })

    class User extends Model{
        @Column({
            type: DataType.STRING(100)
        })
        declare name: string

        @Column({
            type: DataType.STRING(100)
        })
        declare email: string

        @Column({
            type: DataType.STRING(100)
        })
        declare password: string

        @Column({
            type: DataType.STRING(100)
        })
        declare phone: string

        @Column({
            type: DataType.STRING(100)
        })
        declare adress: string

        @Default(false) //por defecto el valor sera true si no se manda nada n el request
        @Column({
            type: DataType.BOOLEAN
        })
        declare admin: boolean

        @HasMany(() => Order)
        orders: Order[];

        @BeforeCreate
        static async hashPasswordBeforeCreate(user: User) {
            if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            }
        }

        // Hook para hashear la contraseña antes de actualizar el usuario
        @BeforeUpdate
        static async hashPasswordBeforeUpdate(user: User) {
            if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            }
        }

        // Método para comparar contraseñas
        public validPassword(password: string): boolean {
            return bcrypt.compareSync(password, this.password);
        }

    }
    export default User