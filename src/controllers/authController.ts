import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel';
import { AppError } from '../errors/AppError';

const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await UserModel.findByUsername(username);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Senha incorreta', 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'seu_secret_key', {
      expiresIn: '1h',
    });

    res.json({ token });
  }
};

export default authController;