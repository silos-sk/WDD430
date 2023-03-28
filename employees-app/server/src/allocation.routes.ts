import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const allocationRouter = express.Router();
allocationRouter.use(express.json());
 
allocationRouter.get("/", async (_req, res) => {
   try {
       const allocations = await collections.allocations.find({}).toArray();
       res.status(200).send(allocations);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

allocationRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const allocation = await collections.allocations.findOne(query);
  
        if (allocation) {
            res.status(200).send(allocation);
        } else {
            res.status(404).send(`Failed to find an allocation: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an allocation: ID ${req?.params?.id}`);
    }
 });

 allocationRouter.post("/", async (req, res) => {
    try {
        const allocation = req.body;
        const result = await collections.allocations.insertOne(allocation);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new allocation: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new allocation.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 allocationRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const allocation = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.allocations.updateOne(query, { $set: allocation });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an allocation: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an allocation: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an allocation: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 allocationRouter.delete("/:id", async (req, res) => {
   try {
       const id = req?.params?.id;
       const query = { _id: new mongodb.ObjectId(id) };
       const result = await collections.allocations.deleteOne(query);
 
       if (result && result.deletedCount) {
           res.status(202).send(`Removed an allocation: ID ${id}`);
       } else if (!result) {
           res.status(400).send(`Failed to remove an allocation: ID ${id}`);
       } else if (!result.deletedCount) {
           res.status(404).send(`Failed to find an allocation: ID ${id}`);
       }
   } catch (error) {
       console.error(error.message);
       res.status(400).send(error.message);
   }
});