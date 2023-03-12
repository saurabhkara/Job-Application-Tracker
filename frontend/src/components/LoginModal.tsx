import React from 'react';
import { getLoginUser } from '../helper/apiCalls';
import { IInputLogin,IUser } from '../model/user';  
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import {useForm } from 'react-hook-form'

interface ILoginProp{
    onClose:()=>void,
    onLoginSuccessfull:(user:IUser)=>void

}

export default function LoginModal({onClose,onLoginSuccessfull}:ILoginProp) {

    const { register,handleSubmit, formState:{isSubmitting, errors} } = useForm<IInputLogin>();

    async function onLogin(data:IInputLogin){
        try {
            const res :IUser = await getLoginUser(data);
            console.log(res);
            onLoginSuccessfull(res)
        } catch (error) {
            let err = error as {message:string}
            alert(err.message);
            console.log(err.message);
        }
    }

  return (
    <Modal show onHide={onClose} >
        <Modal.Header closeButton>Login</Modal.Header>
        <Modal.Body>
                <Form id="loginForm" onSubmit={handleSubmit(onLogin)}>
                    <TextInputField 
                        placeholder="Enter your username"
                        label='Username'
                        name="username"
                        register={register}
                        error={errors.username}
                        registerOption={{required:'Username required'}}
                    />
                    <TextInputField 
                        placeholder="Enter your password"
                        label="Password"
                        name="password"
                        register={register}
                        registerOption={{required:"Password required"}}
                        error={errors.password}
                        type='password'

                    />
                </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button form="loginForm" type='submit' disabled={isSubmitting}>Login</Button>
        </Modal.Footer>
    </Modal>
  )
}
