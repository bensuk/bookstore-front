import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "./Variables";
import {withRouter} from './withRouter';
import { Navigate } from "react-router-dom";


export default function Publisher(props){
    const [publishers, setPublishers] = useState([]);
    const [addPublisher, setAddPublisher] = useState(false);
    const [publisherName, setPublisherName] = useState("");
    const [publisherCountry, setPublisherCountry] = useState("");
    const [publisherFouned, setPublisherFouned] = useState("");
    const [publisherNotActiveSince, setPublisherNotActiveSince] = useState("");
    const [editPublisherId, setEditPublisherId] = useState("");

    const navigate = useNavigate();

    useEffect(() =>{
        getList();
    })

    function getList() {
        axios.get(variables.API_URL + "publishers")
        .then(response => setPublishers(response.data))
        .catch(error => alert(error.response.data));
    }

    function tableClickHandle(id) {
        navigate("/Authors/" + id);
    }

    function addClickHandle(){
        setAddPublisher(true);
    }

    function editClickHandle(id){
        setAddPublisher(false);
        setEditPublisherId(id);
    }

    function createPublisher(){
        const token = localStorage.getItem("user");

        axios.post(variables.API_URL + "publishers", {
            Name: publisherName,
            Country: publisherCountry,
            Founded: publisherFouned
        },{
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            if (response.ok){
                getList();
            }
        }).catch(error => alert(error.response.statusText));

        setPublisherName("");
        setPublisherCountry("");
        setPublisherFouned("");
    }

    function updatePublishser(){
        const token = localStorage.getItem("user");

        axios.put(variables.API_URL + "publishers/" + editPublisherId, {
            nonActiveSince: publisherNotActiveSince
        },{
            headers: {Authorization: 'Bearer ' + token}
        }).then(response => {
            if (response.ok){
                getList()
            }
        }).catch(error => alert(error.response.statusText));

        setPublisherNotActiveSince("");
    }

    function deleteClickHandle(id){
        if (window.confirm("Confirmation")){
            const token = localStorage.getItem("user");

            axios.delete(variables.API_URL + "publishers/" + id, {
                headers: {Authorization: 'Bearer ' + token}
            }).then(response => {
                if (response.ok){
                    getList()
                }
            }).catch(error => alert(error.response.statusText));
        }
    }
    
    return(
    <div>
        <h3 className='d-flex justify-content-center m-3'>
            Publishers
        </h3>
        {props.isUserLogged && (
        <button type="button" className="btn btn-primary m-2 float-right" data-bs-toggle="modal" data-bs-target="#PublisherModal"
        onClick={() => addClickHandle()}>
            Add publisher
        </button>)}
        
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Founded</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {publishers.map(x => <tr key={x.id}>
                    <td>
                        {x.name}
                    </td>
                    <td>
                        {x.country}
                    </td>
                    <td>
                        {x.founded}
                    </td>
                    <td>
                        <button type="button" className="btn btn-light mr-1"
                        onClick={() => tableClickHandle(x.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </button>

                        {props.isUserLogged && (
                        <React.Fragment>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal" 
                        data-bs-target="#PublisherModal"
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
        
        <div className="modal fade" id="PublisherModal" tabIndex="-1" role="dialog" aria-labelledby="PublisherModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="PublisherModalLabel">{addPublisher ? 'Add publisher' : 'Update publisher'}</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {addPublisher ? (
                        <form>
                            <div className="form-group">
                                <label htmlFor="publisherName" className="col-form-label">Name</label>
                                <input type="text" className="form-control" id="publisherName" required
                                value={publisherName}
                                onChange={(e) => setPublisherName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="publisherCountry" className="col-form-label">Country</label>
                                <input type="text" className="form-control" id="publisherCountry" required
                                value={publisherCountry}
                                onChange={(e) => setPublisherCountry(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="publisherFounded" className="col-form-label">Founded</label>
                                <input type="number" className="form-control" id="publisherFounded" required
                                value={publisherFouned}
                                onChange={(e) => setPublisherFouned(e.target.value)}/>
                            </div>
                        </form>
                        ):(
                            <form>
                            <div className="form-group">
                            <label htmlFor="publisherNotActive" className="col-form-label">Not active since</label>
                                <input type="number" className="form-control" id="publisherNotActive" required
                                value={publisherNotActiveSince}
                                onChange={(e) => setPublisherNotActiveSince(e.target.value)}/>
                            </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={addPublisher ? (() => createPublisher()) : (() => updatePublishser())}>
                            {addPublisher ? 'Create' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }