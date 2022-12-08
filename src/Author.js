import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import { Link, redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import { variables } from "./Variables";

export default function Author(props){
    const [authors, setAuthors] = useState([]);
    const [authorFirstName, setAuthorFirstName] = useState("");
    const [authorSecondName, setAuthorSecondName] = useState("");
    const [authorBornDate, setAuthorBornDate] = useState("");
    const [authorNationality, setAuthorNationality] = useState("");
    const [authorInfo, setAuthorInfo] = useState("");
    const [addAuthor, setAddAuthor] = useState(false);

    const editAuthorId = useRef("");

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
            setAuthors(response.data);
        })
        .catch(error => {
            return navigate("/NotFound"); 
            alert(error.response.statusText);                        
        });
    }

    function addClickHandle(){
        setAddAuthor(true);
    }

    function editClickHandle(id){
        setAddAuthor(false);
        editAuthorId.current = id;
    }

    function createAuthor(){
        const token = localStorage.getItem("user");

        axios.post(path, {
            FirstName: authorFirstName,
            LastName: authorSecondName,
            BornDate: authorBornDate,
            Nationality: authorNationality
        },{
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            if (response.ok){
                getList();
            }
        }).catch(error => alert(error.response.statusText));

        setAuthorFirstName("");
        setAuthorSecondName("");
        setAuthorBornDate("");
        setAuthorNationality("");
    }

    function updateAuthor(){
        const token = localStorage.getItem("user");

        axios.put(path + '/' + editAuthorId.current, {
            FirstName: authorFirstName,
            LastName: authorSecondName
        },{
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            if (response.ok){
                getList()
            }
        }).catch(error => alert(error.response.statusText));

        setAuthorFirstName("");
        setAuthorSecondName("");
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
        const result = authors.find(obj => {
            return obj.id === id;
        });

        setAuthorInfo(   <React.Fragment>
                            <b>Id: </b>{result.id}<br/>
                            <b>First Name: </b>{result.firstName}<br/>
                            <b>Last Name: </b>{result.lastName}<br/>
                            <b>Born date: </b>{result.bornDate}<br/>
                            <b>Nationality: </b>{result.nationality}<br/>
                            </React.Fragment>);
    }
    
    return(
    <div>
        <h3 className='d-flex justify-content-center m-3'>
            Authors
        </h3>
        {props.isUserLogged && (
        <button type="button" className="btn btn-primary m-2 float-right" data-bs-toggle="modal" data-bs-target="#AuthorModal"
        onClick={() => addClickHandle()}>
            Add author
        </button>)}
        
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Second Name</th>
                    <th>Born data</th>
                    <th>Nationality</th>
                    <th>Options</th>
                    <th>Books</th>
                </tr>
            </thead>
            <tbody>
                {authors.map(x => <tr key={x.id}>
                    <td>
                        {x.firstName}
                    </td>
                    <td>
                        {x.lastName}
                    </td>
                    <td>
                        {x.bornDate}
                    </td>
                    <td>
                        {x.nationality}
                    </td>
                    <td>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal" 
                        data-bs-target="#AuthorInfoModal"
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
                        data-bs-target="#AuthorModal"
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
                    <td>
                        <Link className="btn btn-light mr-1" to={x.id + "/Books"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </table>
        
        <div className="modal fade" id="AuthorModal" tabIndex="-1" role="dialog" aria-labelledby="AuthorModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="AuthorModalLabel">{addAuthor ? 'Add author' : 'Update author'}</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {addAuthor ? (
                        <form>
                            <div className="form-group">
                                <label htmlFor="authorFirstName" className="col-form-label">First Name</label>
                                <input type="text" className="form-control" id="authorFirstName" required
                                value={authorFirstName}
                                onChange={(e) => setAuthorFirstName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="authorSecondName" className="col-form-label">Last Name</label>
                                <input type="text" className="form-control" id="authorSecondName" required
                                value={authorSecondName}
                                onChange={(e) => setAuthorSecondName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="authorBornDate" className="col-form-label">Born date</label>
                                <input type="date" className="form-control" id="authorBornDate" required
                                value={authorBornDate}
                                onChange={(e) => setAuthorBornDate(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="authorNationality" className="col-form-label">Nationality</label>
                                <input type="text" className="form-control" id="authorNationality" required
                                value={authorNationality}
                                onChange={(e) => setAuthorNationality(e.target.value)}/>
                            </div>
                        </form>
                        ):(
                            <form>
                            <div className="form-group">
                            <label htmlFor="authorFirstName" className="col-form-label">First Name</label>
                                <input type="text" className="form-control" id="authorFirstName" required
                                value={authorFirstName}
                                onChange={(e) => setAuthorFirstName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="authorSecondName" className="col-form-label">Last Namee</label>
                                <input type="text" className="form-control" id="authorSecondName" required
                                value={authorSecondName}
                                onChange={(e) => setAuthorSecondName(e.target.value)}/>
                            </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={addAuthor ? (() => createAuthor()) : (() => updateAuthor())}>
                            {addAuthor ? 'Create' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="modal fade" id="AuthorInfoModal" tabIndex="-1" role="dialog" aria-labelledby="AuthorInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="AuthorInfoModalLabel">Author information</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {authorInfo}
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