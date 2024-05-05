import { Router } from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../services/users.js';

const router = Router();

router.get("/", async (request, response) => {
   
        const users = await getUsers();
        return response.status(200).send(users);
    
});

router.get("/:id", async (request, response) => {
    const user = await getUser(request.params.id);
    return response.status(200).send(user);
});


router.post("/", async (request, response) => {
    const params = request.body;
    const user = await createUser(params);
    return response.status(201).send(user);
});

router.delete("/:id", async (request, response) => {
    await deleteUser(request.params.id);
    return response.status(204).send();
});

router.put("/:id", async (request, response) => {
    const user = await updateUser(request.params.id, request.body);
    return response.status(200).send(user);
});

export default router;