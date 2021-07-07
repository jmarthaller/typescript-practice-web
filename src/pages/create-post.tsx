import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
// import router from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
// import { toErrorMap } from '../utils/toErrorMap';




const CreatePost: React.FC<{}> = ({}) => {
        return (
            <Wrapper variant="small">
                <Formik 
                initialValues={{title: "", text: ""}} 
                onSubmit={async (values) => {
                    console.log(values)
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <InputField
                                name='title'
                                placeholder='title'
                                label='Title'
                            />
                            <Box mt={4}>
                            <InputField
                                textarea
                                name='text'
                                placeholder='text...'
                                label='Text'
                            />
                            </Box>
                            <Box mt={4}>
                            <Button type="submit" variantcolor="teal" isLoading={isSubmitting}>Create Post</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}


export default withUrqlClient(createUrqlClient)(CreatePost);