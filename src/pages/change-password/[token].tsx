import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
// import router from 'next/router';
import React from 'react'
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
// import { toErrorMap } from '../../utils/toErrorMap';


const ChangePassword: NextPage<{token: string}> = ({ token }) => {
        return (
            
            <Wrapper variant="small">
                <div>Token is: {token}</div>;
                <Formik 
                initialValues={{ newPassword: ""}} 
                onSubmit={async () => {              // might need ---------- values, {setErrors}
                    // const response = await login(values);
                    // if (response.data?.login.errors) {
                    //     setErrors(toErrorMap(response.data.login.errors));
                    // } else if (response.data?.login.user) {
                    //     router.push("/");
                    // }
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <InputField
                                name='newPassword'
                                placeholder='new password'
                                label='New Password'
                                type='password'
                            />
                            <Box mt={4}>
                            <Button type="submit" variantcolor="teal" isLoading={isSubmitting}>Enter New Password</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default ChangePassword;