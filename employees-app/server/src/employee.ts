import * as mongodb from "mongodb";
 
export interface Employee {
   name: string;
   position: string;
   level: "Junior" | "Mid" | "Senior";
   _id?: mongodb.ObjectId;
}