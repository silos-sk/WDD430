import * as mongodb from "mongodb";
 
export interface Allocation {
   _id?: mongodb.ObjectId;
   list?: "OGD" | "Colon" | "EUS" | "ERCP" | "Bronchs";
   type?: string;
   doctor?: mongodb.ObjectId;
   staff?: "Nurse" | "HCA";
   name?: mongodb.ObjectId;
   
}