import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as coreNavigation from '../core/navigation';
import '../App.css';

export default class EditableEntity extends Component {
    constructor(props) {
        super(props);
        
        const updatedEntity = {};

        props.fields.map(field => updatedEntity[field.key] = '');

        this.state = {
            isLoading: false,
            fields: props.fields,
            updatedEntity: props.value || updatedEntity,
            dirty: false
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount() {
        
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            isLoading: !nextProps.value,
            updatedEntity: nextProps.value || {},
        });
    } 
    handleFieldChange (field, transform) {
            return (event, value) => {
                const updatedEntity = this.state.updatedEntity;

                updatedEntity[field] = transform ? transform(value) : value;
                
                this.setState({ updatedEntity, dirty: true });
            };
    }
    handleUpdate () {
        this.setState({ dirty: false });

        this.props.onConfirm(this.state.updatedEntity);
    }
    render() {
            return (
                <div>
                { this.state.isLoading &&
                        <div className="text-center" style={{ 'marginTop': '40px' }}>
                            <CircularProgress size={80} thickness={5} />
                        </div>
                }
                { !this.state.isLoading &&
                            <div className="container">
                                <div className="col-xs-12 col-sm-8">
                                    { this.props.fields.map((field, index) =>
                                        <div className="col-xs-12" key={index}>
                                                <TextField
                                                    ref="title"
                                                    onChange={ this.handleFieldChange(field.key) }
                                                    value={this.state.updatedEntity[field.key]}
                                                    style={{width: '100%'}}
                                                    inputStyle={{width: '100%'}}
                                                    floatingLabelText={field.label}
                                                    hintText={field.hint}
                                                    floatingLabelFixed={true}
                                                />
                                        </div> 
                                    )}
                                    <div className="row">
                                        <div className="col-xs-12" style={{ marginTop: 30 }}>
                                            { this.state.showCancelBtn &&  
                                                <FlatButton
                                                    style={ { float: 'left' } }
                                                    label={this.props.cancelLabel || 'Cancel'}
                                                    primary={ true }
                                                    disabled={ false }
                                                    onTouchTap={ () => coreNavigation.goBack() }
                                                />
                                            }
                                            <RaisedButton
                                                disabled={!this.state.dirty}
                                                style={ { float: 'right' } }
                                                label={this.props.saveLabel || 'Save'}
                                                primary={ true }
                                                onTouchTap={ this.handleUpdate }
                                            />
                                        </div>
                                    </div>  
                                </div>
                            </div>
                    }
                </div>
            );
    }
};