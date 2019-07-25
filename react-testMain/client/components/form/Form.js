import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel'
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './Form.css';
import { withStyles } from '@material-ui/core/styles';

const inLineStyles = theme => ({
    textFieldInput: {
        fontSize: '16px'
    }
});

class Form extends React.Component {
    constructor(){
        super();

        this.state={
            error: {
                  InterfaceName: '',
                   Structure: '',
                   ErrorFound: '',
                   Analysis: '',
                   ProblemCandidate:''
            },
            data: {
                  InterfaceName: '',
                   Structure: '',
                   ErrorFound: '',
                   Analysis: '',
                   ProblemCandidate:''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }


    handleChange(event) {
        event.persist();
        let errorMsg = '';

        if(event.target.value === '') {
            errorMsg = 'Field is required!';
            this.setState((state) => this.state.error.isError = true);
        }
        this.setState((state) => state.error[event.target.id] = errorMsg);
        this.setState((state) => state.data[event.target.id] = event.target.value);
    }





    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.data.Structure !== nextState.Structure) {
            return true;
        }
        return false;
    }


    isFormValid() {
       let result = true;

       Object.keys(this.state.data).map( (key) => {
           let field = this.state.data[key];
           if(field === null || field === '') {
               this.setState((state) => state.error[key] = 'Field is required');
               result = false;
           }
       });
       return result;
    }


    saveData(event) {
        if(!this.isFormValid()) {
            return;
        }

        axios.put(
            '/api/kdatas',
            JSON.stringify(this.state.data),
            {headers: { 'Content-Type': 'application/json' }}
        )
        .then( res => {
            this.props.reloadData();
            this.clearForm();
        })
        .catch( err => {
            console.log(err)
        });
    }


    deleteData(event){
        const dataSelected =
            this.props.data.selectionContext.state !== ''
            ? this.props.data.selectionContext.state.selected
            : '';

        if(!dataSelected){
            console.log('not seleted');
            return;
        }

        const ids = {
            InterfaceName: dataSelected
        };

        if (ids.InterfaceName.length > 0) {
            axios.post(
                'api/deleteKData',
                JSON.stringify(ids),
                {headers: { 'Content-Type': 'application/json' }}
            )
            .then(res => {
                this.props.reloadData();
                this.clearForm();
            })
            .catch( err => {
                    console.log(err);
            });
        }
    }
	toggleForm =() =>{
	if(document.getElementById("toggleBtn").value=="1"){
		document.getElementById("toggleBtn").value="0";
		document.getElementById("FormView").style.display="block";
	}
	else
	{
		document.getElementById("toggleBtn").value="1";
		document.getElementById("FormView").style.display="none";
	}
	}

    clearForm = () => {
        document.getElementById("myForm").reset();
        this.setState({
            data: {
                 InterfaceName: '',
                 Structure: '',
                 ErrorFound: '',
                 Analysis: '',
                 ProblemCandidate:''
             }
        });
    }


    render(){
        const { classes } = this.props;

        const errorInputMsg = (id) => (
            <span className={styles.errorMsg}>{this.state.error[id]}</span>
        )

        const inputStyles = {
            fontSize: '40px'
        }

        return(
			<div>
			<Button
			 className={styles.toggleBtn}
			 id="toggleBtn"
			 value="1"
             variant="contained"
             size="medium"
			onClick={this.toggleForm}>
               Add Data
             </Button>
			
           <form id="myForm" className={styles.myForm} noValidate autoComplete="off">
               <div id="FormView" className={styles.divStyle}>
                    <div className={styles.components}>
                        <TextField id="InterfaceName"
                                    placeholder="Interface"
                                    multiline={false}
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange}
                                    error={this.state.data.InterfaceName.length === 0 ? true : false }
                                    helperText={errorInputMsg("InterfaceName")}/>
                    </div>
                    <div className={styles.components}>
                        <TextField id="Structure"
                                    placeholder="Structures"
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange}
                                    error={this.state.data.Structure.length === 0 ? true : false }
                                    helperText={errorInputMsg("Structure")}/>
                    </div>
                    <div className={styles.components}>
                        <TextField id="ErrorFound"
                                    placeholder="Errors Found"
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange}
                                    error={this.state.data.ErrorFound.length === 0 ? true : false }
                                    helperText={errorInputMsg("ErrorFound")}/>
                    </div>
                    <div className={styles.components}>
                        <TextField id="Analysis"
                                    placeholder="Analysis"
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange} error={this.state.data.Analysis.length === 0 ? true : false }
                                    helperText={errorInputMsg("Analysis")}/>
                    </div>
                    <div className={styles.components}>
                        <TextField id="ProblemCandidate"
                                    placeholder="Problem Candidate"
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange} error={this.state.data.ProblemCandidate.length === 0 ? true : false }
                                    helperText={errorInputMsg("ProblemCandidate")}/>
                    </div>
                     <div className={styles.components}>
                        <div className={styles.buttonDiv}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                size="medium"
                                onClick={(event) => this.saveData(event)}>
                                <SaveIcon className={styles.button} />
                                Save
                            </Button>
                            <Button
                                className={styles.button}
                                variant="contained"
                                size="medium"
                                onClick={(event) => this.deleteData(event)}>
                                <DeleteIcon className={styles.button} />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
           </form>
		   </div>
		);
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(inLineStyles)(Form);
