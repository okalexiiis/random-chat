import { Context } from "hono";

export const RegisterUserController = async (ctx: Context) => {
    return ctx.json({message: "hello"})
}