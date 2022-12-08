import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { variables } from "./Variables";

export default function Book(props){

    const [books, setBooks] = useState([]);
    const [bookName, setBookName] = useState("");
    const [bookReleaseDate, setBookReleaseDate] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookInfo, setBookInfo] = useState("");
    const [addBook, setAddBook] = useState(false);

    const editBookId = useRef("");

    const path = variables.API_URL + useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() =>{
        getList();
    })

    function getList() {
        axios.get(path)
        .then(response => {
            // if (response.data.length < 1){
            //     return navigate("/NotFound");
            // }
            setBooks(response.data);
        })
        .catch(() => {
            return navigate("/NotFound"); 
            // alert(error.response.statusText);                        
        });
    }

    function addClickHandle(){
        setAddBook(true);
    }

    function editClickHandle(id){
        setAddBook(false);
        editBookId.current = id;
    }

    function createBook(){
        const token = localStorage.getItem("user");

        axios.post(path, {
            Name: bookName,
            ReleaseDate: bookReleaseDate,
            Description: bookDescription
        },{
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            if (response.ok){
                getList();
            }
        }).catch(error => alert(error.response.statusText));

        setBookName("");
        setBookReleaseDate("");
        setBookDescription("");
    }

    function updateBook(){
        const token = localStorage.getItem("user");

        axios.put(path + '/' + editBookId.current, {
            Description: bookDescription
        },{
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            if (response.ok){
                getList()
            }
        }).catch(error => alert(error.response.statusText));

        setBookDescription("");
    }

    function deleteClickHandle(id){
        if (window.confirm("Confirmation")){
            const token = localStorage.getItem("user");

            axios.delete(path + '/' + id, {
                headers: {Authorization: 'Bearer ' + token}
            }).then(response => {
                if (response.ok){
                    getList()
                }
            }).catch(error => alert(error.response.statusText));
        }
    }

    function infoClickHandle(id){
        const result = books.find(obj => {
            return obj.id === id;
        });

        setBookInfo(   <React.Fragment>
                            <b>Id: </b>{result.id}<br/>
                            <b>Book name: </b>{result.name}<br/>
                            <b>Release date: </b>{result.releaseDate}<br/>
                            <b>Description: </b>{result.description}<br/>
                            </React.Fragment>);
    }
    
    return(
    <div>
        <h3 className='d-flex justify-content-center m-3'>
            Books
        </h3>
        {props.isUserLogged && (
        <button type="button" className="btn btn-primary m-2 float-right" data-bs-toggle="modal" data-bs-target="#BookModal"
        onClick={() => addClickHandle()}>
            Add book
        </button>)}
        
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Release date</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {books.map(x => <tr key={x.id}>
                    <td>
                        {x.name}
                    </td>
                    <td>
                        {x.releaseDate}
                    </td>
                    <td>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal" 
                        data-bs-target="#BookInfoModal"
                        onClick={() => infoClickHandle(x.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </button>

                        {props.isUserLogged && (
                        <React.Fragment>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal" 
                        data-bs-target="#BookModal"
                        onClick={() => editClickHandle(x.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light mr-1"
                        onClick={() => deleteClickHandle(x.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button></React.Fragment>)}
                    </td>
                </tr>)}
            </tbody>
        </table>
        
        <div className="modal fade" id="BookModal" tabIndex="-1" role="dialog" aria-labelledby="BookModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="BookModalLabel">{addBook ? 'Add book' : 'Update book'}</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {addBook ? (
                        <form>
                            <div className="form-group">
                                <label htmlFor="bookName" className="col-form-label">Name</label>
                                <input type="text" className="form-control" id="bookName" required
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookReleaseDate" className="col-form-label">Release date</label>
                                <input type="date" className="form-control" id="bookReleaseDate" required
                                value={bookReleaseDate}
                                onChange={(e) => setBookReleaseDate(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookDescription" className="col-form-label">Description</label>
                                <input type="text" className="form-control" id="bookDescription" required
                                value={bookDescription}
                                onChange={(e) => setBookDescription(e.target.value)}/>
                            </div>
                        </form>
                        ):(
                            <form>
                            <div className="form-group">
                            <label htmlFor="bookDescription" className="col-form-label">Description</label>
                                <input type="text" className="form-control" id="bookDescription" required
                                value={bookDescription}
                                onChange={(e) => setBookDescription(e.target.value)}/>
                            </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={addBook ? (() => createBook()) : (() => updateBook())}>
                            {addBook ? 'Create' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="modal fade" id="BookInfoModal" tabIndex="-1" role="dialog" aria-labelledby="BookInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="BookInfoModalLabel">Book information</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {bookInfo}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
        )
    }