import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
// import router from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
// import { toErrorMap } from '../utils/toErrorMap';




const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation();

        return (
            <Wrapper variant="small">
                <Formik 
                initialValues={{ email: "" }} 
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setComplete(true)
                }}>
                    {({isSubmitting}) => complete ? <Box>We've sent you an email</Box> : (
                        <Form>
                            <InputField
                                name='email'
                                placeholder='email'
                                label='Email'
                                type='email'
                            />
                                {/* <Box>
                                    <NextLink href="/forgot-password">
                                        {" "}
                                        <Link>
                                            Forgot Password?
                                        </Link>
                                    </NextLink>
                                </Box> */}
                            <Box mt={2}>
                                <Button type="submit" variantcolor="teal" isLoading={isSubmitting}>Forgot Password</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}


export default withUrqlClient(createUrqlClient)(ForgotPassword);