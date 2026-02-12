import zod from "zod";

export const UserType = zod.object({
    id: zod.string(),
    email: zod.string().email(),
    Username: zod.string(),
    password: zod.string(),
    createdAt: zod.date(),
    updatedAt: zod.date(),
})  

export type UserType = zod.infer<typeof UserType>;
