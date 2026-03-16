import dotenv from "dotenv";
import roleModel from "../src/module/role/role.model";
import mongodb from "../config/db.js";


dotenv.config();
const roles=[{
    name:"Admin",
    permission:["GET","POST","PUT","DELETE"],
},
{
     name:"User",
    permission:["GET"],
},
{
     name:"Librarian",
    permission:["GET","POST","PUT"],
},
];
const seedRoles=async ()=>{
    try{
        await mongodb();
        for(const role of roles){
            const existingRole=await roleModel.findOne({
                name:role.name
            });
            if(!existingRole){
                await roleModel.create(role);
                console.log(`Role '${role.name}' created.`);
            }else{
                console.log(`Role '${role.name}' already exists.`);
            }
        }
        console.log("Seeding completed successfully");
        process.exit(0);
    }catch(error){
        console.error("Error seeding roles",error);
        process.exit(1);
    }
};
seedRoles();