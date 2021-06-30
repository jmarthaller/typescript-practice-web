import React from 'react'
import { Formik, Form } from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {

}




const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation()
        return (
            <Wrapper variant="small">
                <Formik 
                initialValues={{username: "", password: ""}} 
                onSubmit={async (values) => {
                    const response = await register(values);
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <InputField
                                name='username'
                                placeholder='username'
                                label='Username'
                            />
                            <Box mt={4}>
                            <InputField
                                name='password'
                                placeholder='password'
                                label='Password'
                                type='password'
                            />
                            </Box>
                            <Box mt={2}>
                            <Button type="submit" variantcolor="teal" isLoading={isSubmitting}>Register User</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default Register;