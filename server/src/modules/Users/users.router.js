// ========================================================
// Imports
// ========================================================

import express from 'express';

// ========================================================
// Routes
// ========================================================
const router = express.Router();
//UPDATE
router.put('/:id', verifyToken, verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyToken, verifyUser, deleteUser);
//GET
router.get('/:id', verifyToken, verifyUser, getUser);
//GET ALL
router.get('/', verifyToken, verifyAdmin, getUsers);

// ========================================================
// Exports
// ========================================================
export default router;
