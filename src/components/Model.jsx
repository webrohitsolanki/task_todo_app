import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Model = ({ setShow, show, id, getUsers }) => {

    const [user, setUser] = useState({});

    const handleClose = () => setShow(false);

    const handleSave = async () => {
        const saveUser = await axios.put(`https://645af57265bd868e932775a1.mockapi.io/users/users/${id}`, user)

        if (saveUser.statusText === 'OK') {
            toast.success('updated')
            getUsers();
            setShow(false);
        } else {
            toast.error('Something went wrong')
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const getUser = () => {
        axios.get(`https://645af57265bd868e932775a1.mockapi.io/users/users/${id}`)
            .then((response) => {
                setUser(response.data)
            });
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleIscomplete = (complete) => {
        setUser({ ...user, isComplete: !complete });
    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group mb-3">
                    <label htmlFor="id">ID:-  {user.id}</label>
                </div>
                <div className="form-group mb-3">
                    <input type="text" className='form-control' name='name' value={user.name || ''} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <input type="number" className='form-control' name='age' value={user.age || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='isComplete' className='me-3'>Complete: </label>
                    <input type="checkbox" name='isComplete' checked={user.isComplete ? true : false} onChange={() => handleIscomplete(user.isComplete)} />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <ToastContainer />
        </Modal>
    )
}

export default Model;