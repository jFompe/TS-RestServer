import { Request, Response } from "express";
import { json } from "sequelize/types";
import User from "../models/user";

export const getUsers = async ( req: Request, res: Response ) => {

  const users = await User.findAll({
    where: {
      isDeleted: false
    }
  });

  res.json({ 
    msg: 'getUsers',
    users 
  })

}

export const getUser = async ( req: Request, res: Response ) => {

  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: 'User not found'
    })
  }

  res.json({ 
    msg: 'getUser', 
    user
  })

}

export const createUser = async ( req: Request, res: Response ) => {

  const { body } = req;

  const emailExists = await User.findOne({
    where: {
      email: body.email
    }
  });

  if (emailExists) {
    return res.status(400).json({
      msg: 'Email already in use'
    })
  }

  const user = User.build(body);
  await user.save();

  res.json({
    msg: 'createUser',
    user
  })

}

export const updateUser = async ( req: Request, res: Response ) => {

  const { id } = req.params;
  const { body } = req;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: 'User not found'
    })
  }

  await user.update(body);

  res.json({
    msg: 'updateUser',
    user
  })

}

export const deleteUser = async ( req: Request, res: Response ) => {

  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: 'User not found'
    })
  }

  await user.update({ isDeleted: true });

  res.json({
    msg: 'deleteUser',
    id
  })

}