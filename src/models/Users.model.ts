import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UsersInterface extends Document {
    email: string,
    password: string,
    name: string,
    level: number
}

const UsersSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})

UsersSchema.pre<UsersInterface>('save', async function (next) {
    try {
        console.log("Called before saving a User")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

export default mongoose.model<UsersInterface>('Users', UsersSchema)