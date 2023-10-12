import { registerAs } from "@nestjs/config";

export default registerAs('database',()=>({
    type:process.env.TYPE,
    host:process.env.PGHOST,
    port:process.env.PGPORT,
    password:process.env.PGPASSWORD,
    username:process.env.PGUSER,
    name:process.env.PGDATABASE,
    synchronize:false
}))