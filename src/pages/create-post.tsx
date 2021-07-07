import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
// import router from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { createUrqlClient } from '../utils/createUrqlClient';
// import { toErrorMap } from '../utils/toErrorMap';
import { useRouter  } from 'next/router';
import { useCreatePostMutation } from '../generated/graphql';
import { Layout } from '../components/Layout';




const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter(); 
    const [, createPost] = useCreatePostMutation();
        return (
            <Layout variant="small">
                <Formik 
                initialValues={{title: "", text: ""}} 
                onSubmit={async (values) => {
                    await createPost({input: values})
                    router.push('/');
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
            </Layout>
        );
}


export default withUrqlClient(createUrqlClient)(CreatePost);

