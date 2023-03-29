import * as mongodb from "mongodb";
import { Allocation } from "./allocation";
import { Employee } from "./employee";
 
export const collections: {
   employees?: mongodb.Collection<Employee>;
   allocations?: mongodb.Collection<Allocation>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("employees-app");
   await applySchemaValidation(db);
 
   const employeesCollection = db.collection<Employee>("employees");
   collections.employees = employeesCollection;

   const allocationsCollection = db.collection<Allocation>("allocations");
   collections.allocations = allocationsCollection;
}
 
// Update existing collection with JSON schema validation so documents will always match the shape of the data model, even if added elsewhere.

async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "position", "level"],
           additionalProperties: false,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               position: {
                   bsonType: "string",
                   description: "'position' is required and is a string",
                   minLength: 3
               },
               level: {
                   bsonType: "string",
                   description: "'level' is required and is one of 'Junior', 'Mid', or 'Senior'",
                   enum: ["Junior", "Mid", "Senior"],
               },
           },
       },
   };

   const allocSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["theatreNum", "list", "type", "doctor", "staff1", "name1", "staff2", "name2"],
        additionalProperties: false,
        properties: {
            _id: {},
            theatreNum: {
                bsonType: "int",
                description: "'Theatre Number' is required"
            },
            list: {
                bsonType: "string",
                description: "'List' is required and is one of 'OGD', 'Colon', 'EUS', 'ERCP', or 'Bronchs'",
                enum: ["OGD", "Colon", "EUS", "ERCP", "Bronchs"],
            },
            type: {
                bsonType: "string",
                description: "'type' is required and is one of 'Diagnostic', or 'Therapeutic' ",
                enum: ["Diagnostic", "Therapeutic"]
            },
            doctor: {
                bsonType: "string",
                description: "'doctor' is required and is a string",
            },
            staff1: {
                bsonType: "string",
                description: "'staff' is required and is one of 'Nurse', or 'HCA'",
                enum: ["Nurse", "HCA"],
            },
            name1: {
                bsonType: "string",
                description: "'name' is required and is a string",
            },
            staff2: {
                bsonType: "string",
                description: "'staff' is required and is one of 'Nurse', or 'HCA'",
                enum: ["Nurse", "HCA"],
            },
            name2: {
                bsonType: "string",
                description: "'name' is required and is a string",
            }
            // comments: {
            //     bsonType: "string",
            //     description: "'comment' is required and is a string; type 'N/A' if not applicable",
            // },
        },
    },
};
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "employees",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("employees", {validator: jsonSchema});
       }
   });

   await db.command({
    collMod: "allocations",
    validator: allocSchema
}).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("allocations", {validator: allocSchema});
    }
});
}