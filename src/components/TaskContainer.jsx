import { useEffect, useState } from 'react';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Model from './Model';

const TaskContainer = () => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');

    const [id, setId] = useState('');

    // modal
    const [show, setShow] = useState(false);
    const handleShow = (userid) => {
        setId(userid)
        setShow(true)
    };

    const [deleteUsers, setDeleteUser] = useState([]);

    const handleDelete = (id) => {

        const res = confirm('Are you sure you want to delete')

        if (res) {
            axios.delete(`https://645af57265bd868e932775a1.mockapi.io/users/users/${id}`)
                .then((data) => {
                    console.log(data);

                    // handle delete records as well
                    setDeleteUser([...deleteUsers, data]);

                    // delete toast
                    toast.success(`${data.name} is now deleted`)

                    getUsers();
                }).catch((error) => {
                    alert(error)
                })
        }
    }

    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { name: userName }
        axios.post(`https://645af57265bd868e932775a1.mockapi.io/users/users`, payload)
            .then((res) => {
                setUsers([...users, res.data]);
                setUserName('');

                toast.success('🦄 Updated Successfully!');
            }).catch((error) => {
                alert(error);
            })
    }

    const getUsers = () => {
        axios.get('https://645af57265bd868e932775a1.mockapi.io/users/users')
            .then((user) => {
                setUsers(user.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    // const handleUndo = (e) => {
    //   e.preventDefault();
    //   setUsers([...users, deleteUsers]);
    //   console.log('deleted user', deleteUsers);
    // }


    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className='container pt-5'>
            <div className="row">

                <div className="col-lg-4">
                    <form className='mb-4'>
                        <div className="d-flex">
                            <input type="text" className='form-control' placeholder='Name' onChange={handleChange} value={userName} />
                            <button onClick={handleSubmit} className='btn btn-primary'>Add</button>
                        </div>
                        {/* <button onClick={handleUndo}>undo all delete</button> */}
                    </form>
                </div>

                <div className="row mx-auto">
                    {
                        users && users.map((user) => {
                            return (
                                <div key={user.id} className="col-lg-3 col-sm-6 mb-3">
                                    <div className={`card ${user.isComplete ? 'bg-light' : 'bg-white'}`}>
                                        <div className="card-body">
                                            <div className={`badge ms-auto ${user.isComplete ? 'bg-danger' : 'bg-success'}`}>{user.isComplete ? 'completed' : 'open'}</div>

                                            <p className='m-0'>Name: {user.name}</p>
                                            <p className='mb-3'>Age: {user.age}</p>

                                            <div className="d-flex gap-2">
                                                <button onClick={() => { handleShow(user.id) }} className='btn btn-secondary'>Update</button>
                                                <button onClick={() => { handleDelete(user.id) }} className='btn btn-danger'>Delete</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            {/* update model */}
            {
                show && <Model setShow={setShow} show={show} id={id} getUsers={getUsers} />
            }

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <ToastContainer />
        </div>
    )
}

export default TaskContainer