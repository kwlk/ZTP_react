import React from 'react';
import {func} from 'prop-types';
import Form from 'react-bootstrap/Form';

import Button from 'app/components/Button';

const AddBookForm = ({onSubmit}) => {
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBookTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" placeholder="Type the book's title"/>
            </Form.Group>
            <Form.Group controlId="formBookAuthor">
                <Form.Label>Author:</Form.Label>
                <Form.Control type="text" placeholder="Type the book's author"/>
            </Form.Group>

            <Form.Group controlId="formBookYear">
                <Form.Label>Year:</Form.Label>
                <Form.Control type="number" placeholder="Type the book's year"/>
            </Form.Group>
            <Button text="Add"/>
        </Form>
    );
};

AddBookForm.propTypes = {
    onSubmit: func.isRequired,
};

export default AddBookForm;
