import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import EmployeeService from "./services/EmployeeService";
import { Link } from "react-router-dom";

function Test(props: MyComponent) {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees()
    }, []);

    const getEmployees = () => {
        EmployeeService.getEmployees().then((response) => {
            setEmployees(response.data);
            console.log(response.data);
        });
    };

    function deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((response) => {
            // employees.filter(employee => employee.id !== id);
            console.log(id);
            window.location.reload(false);
        })
    }

    function viewEmployee(id){
        props.history.push(`/view/${id}`);
    }

    return (  
        <div >
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <Link to="/createem/-1"><button className="btn btn-primary">Add Employee</button></Link>
            </div><br/>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Employee first name</th>
                            <th> Employee last name</th>
                            <th> Employee Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee) => {
                                return(
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                        <Link to={`/createem/${employee.id}`}><button className="btn btn-info">Update</button></Link>
                                        <button className="btn btn-danger" style={{marginLeft: "10px"}} onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                        <button className="btn btn-info" style={{marginLeft: "10px"}} onClick={() => viewEmployee(employee.id)}>View</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface MyComponent extends RouteComponentProps {
    myField: string;
}
 
export default withRouter(Test);