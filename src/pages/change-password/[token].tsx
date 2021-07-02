import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';


const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
        return (
            <Wrapper variant="small">
                <div>Token is: {token}</div>;
                <Formik 
                initialValues={{ newPassword: ""}} 
                onSubmit={async (values, {setErrors}) => {    
                    const response = await changePassword({newPassword: values.newPassword, token});
                    if (response.data?.changePassword.errors) {
                        setErrors(toErrorMap(response.data.changePassword.errors));
                    } else if (response.data?.changePassword.user) {
                        router.push("/");
                    }
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