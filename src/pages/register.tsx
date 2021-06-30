import React from 'react'
import { Formik, Form } from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {

}


const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        username
        id
      }
    }
  }
`

const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useMutation(REGISTER_MUTATION)
        return (
            <Wrapper variant="small">
                <Formik 
                initialValues={{username: "", password: ""}} 
                onSubmit={(values) => {
                    return register(values);
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