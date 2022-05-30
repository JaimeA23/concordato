import express from "express";


import { getUsers, Register, Login, Logout,getUser,getpersonaje, Crearpersonaje } from "../controllers/Users.js";
import { getdatescreate } from "../controllers/Creators.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.get('/user', verifyToken, getUser);
router.get('/personaje', verifyToken, getpersonaje);
router.get('/crear', verifyToken, getdatescreate);
router.post('/users', Register);
router.post('/login', Login);
router.post('/crearpersonaje', Crearpersonaje);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
export default router;