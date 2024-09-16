import Form from '../components/Form'
import React, { useState } from 'react'


function Login({refetch}){
    return (
        <>
            <Form route='/api/token/' method='login' setShouldRefetch={refetch} />
           
        </>
    )
}

export default Login