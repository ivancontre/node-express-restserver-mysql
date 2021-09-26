import { Request, Response} from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => { 

    try {
        const users = await User.findAll();

        return res.json({users});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }
    
};

export const getUser = async (req: Request, res: Response) => {    
    
    try {

        const { id } = req.params;

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                msg: 'No existe usuario con id ' + id
            });
        }

        return res.json({user});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }
    
};

export const postUser = async (req: Request, res: Response) => {

    try {

        const { body } = req;

        const emailExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (emailExists) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }

        const user = await User.create(body);
    
        return res.json({
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }    

};

export const putUser = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const { body } = req;

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                msg: 'No existe usuario con id ' + id
            });
        }

        if (body.email) {
            const emailExists = await User.findOne({
                where: {
                    email: body.email
                }
            });
    
            if (emailExists) {
                return res.status(400).json({
                    msg: 'Ya existe un usuario con el email ' + body.email
                });
            }
        }        
        
        await user.update(body);   

    
        return res.json({
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }    

};

export const deleteUser = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                msg: 'No existe usuario con id ' + id
            });
        }  
        
        await user.update({ status: false});   
        // await user.destroy()
    
        return res.json({
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor hable con el administrador'
        });
    }  

};