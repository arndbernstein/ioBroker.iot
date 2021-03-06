import React, {Component, forwardRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Utils from '@iobroker/adapter-react/Components/Utils'
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import {MdAdd as IconAdd} from 'react-icons/md';
import {MdRefresh as IconRefresh} from 'react-icons/md';


import I18n from '@iobroker/adapter-react/i18n';
import MessageDialog from '@iobroker/adapter-react/Dialogs/Message';
import DialogSelectID from '@iobroker/adapter-react/Dialogs/SelectID';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

 
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const styles = () => ({})

class GoogleSmartNames extends Component {
    constructor(props) {
        super(props);
        this.myTableRef =  React.createRef();
        this.state = {
            editedSmartName: '',
            editId: '',
            editObjectName: '',
            deleteId: '',

            showSelectId: false,
            showConfirmation: '',
            changed: [],
            devices: [],
            message: '',
            filter: '',
            loading: true,
            browse: false,
            expanded: [],
            lastChanged: '',
            columns: [
                { title: 'Id', field: 'id' , editable: 'never' ,   cellStyle: {
                    maxWidth: "12rem",
                    overflow: "hidden",
                    wordBreak: "break-all"
                  }},
                { title: 'Smartnames', field: 'name.nicknames' },
                { title: 'ioBType', field: 'ioType',editable: 'never', cellStyle: {
                    maxWidth: "4rem",
                    overflow: "hidden",
                    wordBreak: "break-all"
                  }},
                { title: 'Type', field: 'type' ,  lookup: { 
                    "action.devices.types.AC_UNIT": 'Air conditioning unit	', 
                    "action.devices.types.AIRFRESHENER": 'Air Freshener' ,
                    "action.devices.types.AIRPURIFIER": 'Air purifier' ,
                    "action.devices.types.AWNING": 'Awning' ,
                    "action.devices.types.BLINDS": 'Blinds' ,
                    "action.devices.types.BOILER": 'Boiler' ,
                    "action.devices.types.CAMERA": 'Camera' ,
                    "action.devices.types.COFFEE_MAKER": 'Coffee maker' ,
                    "action.devices.types.CURTAIN": 'Curtain' ,
                    "action.devices.types.DISHWASHER": 'Dishwasher' ,
                    "action.devices.types.DOOR": 'Door' ,
                    "action.devices.types.DRYER": 'Dryer' ,
                    "action.devices.types.FAN": 'Fan' ,
                    "action.devices.types.FIREPLACE": 'Fireplace' ,
                    "action.devices.types.GARAGE": 'Garage' ,
                    "action.devices.types.GATE": 'Gate' ,
                    "action.devices.types.HEATER": 'Heater' ,
                    "action.devices.types.HOOD": 'Hood' ,
                    "action.devices.types.KETTLE": 'Kettle' ,
                    "action.devices.types.LIGHT": 'Light' ,
                    "action.devices.types.LOCK": 'Lock' ,
                    "action.devices.types.MOP": 'Mop' ,
                    "action.devices.types.MICROWAVE": 'Microwave' ,
                    "action.devices.types.OUTLET": 'Outlet' ,
                    "action.devices.types.OVEN": 'Oven' ,
                    "action.devices.types.PERGOLA": 'Pergola' ,
                    "action.devices.types.REFRIGERATOR": 'Refrigerator' ,
                    "action.devices.types.SCENE": 'Scene' ,
                    "action.devices.types.SECURITYSYSTEM": 'Security System' ,
                    "action.devices.types.SENSOR": 'Sensor' ,
                    "action.devices.types.SHUTTER": 'Shutter' ,
                    "action.devices.types.SHOWER": 'Shower' ,
                    "action.devices.types.SPEAKER": 'Speaker' ,
                    "action.devices.types.SPRINKLER": 'Sprinkler' ,
                    "action.devices.types.SWITCH": 'Switch' ,
                    "action.devices.types.THERMOSTAT": 'Thermostat' ,
                    "action.devices.types.VACUUM": 'Vacuum' ,
                    "action.devices.types.VALVE": 'Valve' ,
                    "action.devices.types.WASHER": 'Washer' ,
                    "action.devices.types.WATERHEATER": 'Water heater' ,
                    "action.devices.types.WINDOW": 'Window' 
                }},
                { title: 'Funktion/Trait', field: 'displayTraits' ,  lookup: { 
                    // "action.devices.traits.ArmDisarm":'ArmDisarm',
                    "action.devices.traits.Brightness":'Brightness',
                    // "action.devices.traits.CameraStream":'CameraStream',
                    "action.devices.traits.ColorSetting_temperature":'ColorSetting_Temperature',
                    "action.devices.traits.ColorSetting_spectrumRGB":'ColorSetting_RGB',
                    // "action.devices.traits.Dock":'Dock',
                    "action.devices.traits.FanSpeed":'FanSpeed',
                    // "action.devices.traits.LightEffects":'LightEffects',
                    // "action.devices.traits.Locator":'Locator',
                    "action.devices.traits.LockUnlock":'LockUnlock',
                    "action.devices.traits.Modes":'Modes',
                    "action.devices.traits.OnOff":'OnOff',
                    "action.devices.traits.OpenClose":'OpenClose',
                    // "action.devices.traits.RunCycle":'RunCycle',
                    "action.devices.traits.Scene":'Scene',
                    // "action.devices.traits.Sensor":'Sensor',
                    "action.devices.traits.StartStop":'StartStop',
                    "action.devices.traits.TemperatureControl_temperatureSetpointCelsius":'Oven_SetTemp',
                    "action.devices.traits.TemperatureControl_temperatureAmbientCelsius":'Oven_StatusTemp',
                    "action.devices.traits.TemperatureSetting_thermostatMode":'Thermostat_Mode',
                    "action.devices.traits.TemperatureSetting_thermostatTemperatureSetpoint":'Thermostat_SetTemp',
                    "action.devices.traits.TemperatureSetting_thermostatTemperatureAmbient":'Thermostat_StatusTemp',
                    "action.devices.traits.TemperatureSetting_thermostatHumidityAmbient":'Thermostat_StatusHumidity',
                    // "action.devices.traits.Timer":'Timer',
                    "action.devices.traits.Toggles":'Toggles',
                    "action.devices.traits.Volume":'Volume',
                    }},

                { title: 'Attributes', field: 'displayAttributes' ,   cellStyle: {
                    maxWidth: "12rem",
                    overflow: "hidden",
                    wordBreak: "break-all"
                  },  
                editComponent: props => (
                    <textarea cols="40" rows="20"
                      value={props.value}
                      onChange={e => props.onChange(e.target.value)}
                    />
                  )},
                { title: 'Room', field: 'roomHint', editable: 'never' },
                { title: 'Automatisch', field: 'smartEnum', editable: 'never',cellStyle: {
                    maxWidth: "3rem",
                    overflow: "hidden",
                    wordBreak: "break-all"
                  } },
                  { title: 'Conversation to GH', field: 'displayConv2GH' ,  cellStyle: {
                    maxWidth: "4rem",
                    overflow: "hidden",
                    wordBreak: "break-all"
                  },  
                  editComponent: props => (
                    <div>Conversation to Google Home = function(value)&#123; <br></br>
                     <textarea cols="40" rows="20"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                      />     &#125;</div>
                )}, { title: 'Conversation to ioB', field: 'displayConv2iob' , cellStyle: {
                    maxWidth: "4rem",
                    overflow: "hidden",
                    wordBreak: "break-all"
                    },  
                    editComponent: props => (
                        <div>Conversation to ioBroker = function(value)&#123; <br></br>
                        <textarea cols="40" rows="20"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                        />     &#125;</div>
                    )},  
                  
              ]
        };

        this.timerChanged = null;
        this.browseTimer = null;
        this.browseTimerCount = 0;
        this.editedSmartName = '';

        this.waitForUpdateID = null;
        this.onReadyUpdateBound = this.onReadyUpdate.bind(this);
        this.onResultUpdateBound = this.onResultUpdate.bind(this);

        this.props.socket.getObject(`system.adapter.${this.props.adapterName}.${this.props.instance}`).then(obj => {
            this.props.socket.getState(`system.adapter.${this.props.adapterName}.${this.props.instance}.alive`).then(state => {
                if (!obj || !obj.common || (!obj.common.enabled && (!state || !state.val))) {
                    this.setState({message: I18n.t('Instance must be enabled'), loading: false, devices: []});
                } else {
                    this.browse();
                }
            });
        });
    }
    browse(isIndicate) {
        if (Date.now() - this.lastBrowse < 500) return;
        this.lastBrowse = Date.now();
        if (isIndicate) {
            this.setState({loading: true, browse: true});
        } else {
            this.setState({browse: true});
        }
        console.log('Send BROWSE!');
        this.browseTimer = setTimeout(() => {
            console.log('Browse timeout!');
            this.browseTimer = null;
            this.browseTimerCount++;
            if (this.browseTimerCount < 5) {
                this.browse(isIndicate);
            } else {
                this.setState({message: I18n.t('Cannot read devices!')});
            }
        }, 10000);

        this.props.socket.sendTo(this.props.adapterName + '.' + this.props.instance, 'browseGH', null, list => {
            this.browseTimer && clearTimeout(this.browseTimer);
            this.browseTimerCount = 0;
            this.browseTimer = null;
            if (this.waitForUpdateID) {
                if (!this.onEdit(this.waitForUpdateID, list)) {
                    this.setState({message: I18n.t('Device %s was not added', this.waitForUpdateID)});
                }
                this.waitForUpdateID = null;
            }
            console.log('BROWSE received.');

            this.setState({devices: list, loading: false, changed: [], browse: false});
        });
    }

    onReadyUpdate(id, state) {
        console.log(`Update ${id} ${state ? state.val + '/' + state.ack : 'null'}`);
        if (state && state.ack === true && state.val === true) {
            if (this.devTimer) clearTimeout(this.devTimer);
            this.devTimer = setTimeout(() => {
                this.devTimer = null;
                this.browse();
            }, 10);
        }
    }

    onResultUpdate(state) {
        state && state.ack === true && state.val && this.setState({message: state.val});
    }

    componentWillMount() {
        this.props.socket.subscribeState(`${this.props.adapterName}.${this.props.instance}.smart.updatesGH`, this.onReadyUpdateBound);
        this.props.socket.subscribeState(`${this.props.adapterName}.${this.props.instance}.smart.updatesResult`, this.onResultUpdateBound);
    }

    componentWillUnmount() {
        this.props.socket.unsubscribeState(`${this.props.adapterName}.${this.props.instance}.smart.updatesGH`, this.onReadyUpdateBound);
        this.props.socket.unsubscribeState(`${this.props.adapterName}.${this.props.instance}.smart.updatesResult`, this.onResultUpdateBound);
        if (this.timerChanged) {
            clearTimeout(this.timerChanged);
            this.timerChanged = null;
        }
    }

    informInstance(id) {
        this.props.socket.sendTo(this.props.adapterName + '.' + this.props.instance, 'update', id);
    }

    addChanged(id, cb) {
        const changed = JSON.parse(JSON.stringify(this.state.changed));
        if (changed.indexOf(id) === -1) {
            changed.push(id);
            this.setState({changed}, () => cb && cb());
        } else {
            cb && cb();
        }
    }

    removeChanged(id) {
        const changed = JSON.parse(JSON.stringify(this.state.changed));
        const pos = changed.indexOf(id);

        if (pos !== -1) {
            changed.splice(pos, 1);
            this.setState({changed});
        }
    }

     onEdit(id, devices) {
        devices = devices || this.state.devices;
        const device = devices.find(dev => dev.id === id);
        if (device) {
            this.props.socket.getObject(id)
                .then(obj => {
                    let smartName = device.common.smartName  ?  device.common.smartName  : device._id;
                    if (typeof smartName === 'object' && smartName) {
                        smartName = smartName[I18n.getLanguage()] || smartName.en;
                    }
                    this.editedSmartName = smartName;
                    this.setState({editId: id, editedSmartName: smartName, editObjectName: Utils.getObjectNameFromObj(obj, null, {language: I18n.getLanguage()})});
                });
            return true;
        } else {
            return false;
        }
    }

    onDelete() {
        let id = this.state.deleteId;
        // const device = this.state.devices.find(dev => dev.additionalApplianceDetails.id === id);
        this.addChanged(id, () => {
            this.props.socket.getObject(id)
                .then(obj => {
                    Utils.disableSmartName(obj, this.props.adapterName + '.' + this.props.instance, this.props.native.noCommon);
                    return this.props.socket.setObject(id, obj);
                })
                .then(() => {
                    this.setState({deleteId: '', showConfirmation: false, lastChanged: id});

                    this.timerChanged && clearTimeout(this.timerChanged);
                    this.timerChanged = setTimeout(() => {
                        this.setState({lastChanged: ''});
                        this.timerChanged = null;
                    }, 30000);

                    // update obj
                    this.informInstance(id);
                })
                .catch(err => this.props.onError(err));
        });
    }


   

    renderSelectByOn(id, type) {
        // type = '-', 'stored', false or number [5-100]
        if (type !== false) {
            const items = [
                (<MenuItem key="_" value=""><em>{I18n.t('Default')}</em></MenuItem>),
                (<MenuItem key="last" value="stored">{I18n.t('last value')}</MenuItem>)
            ];
            for (let i = 5; i <= 100; i += 5) {
                items.push((<MenuItem  key={i.toString()} value={i.toString()}>{i}%</MenuItem>));
            }
            return (<FormControl className={this.props.classes.devSubLineByOn}>
                <Select className={this.props.classes.devSubLineByOnSelect} value={(type || '').toString()} onChange={e => this.onParamsChange(id, e.target.value)}>{items}</Select>
                <FormHelperText className={this.props.classes.devSubLineTypeTitle}>{I18n.t('by ON')}</FormHelperText>
            </FormControl>);
        } else {
            return null;
        }
    }

    onParamsChange(id, byON, type) {
        this.addChanged(id, () => {
            this.props.socket.getObject(id)
                .then(obj => {
                    Utils.updateSmartName(obj, undefined, byON, type, this.props.adapterName + '.' + this.props.instance, this.props.native.noCommon);

                    if (this.state.lastChanged !== id) {
                        this.setState({lastChanged: id});
                        this.timerChanged && clearTimeout(this.timerChanged);
                        this.timerChanged = setTimeout(() => {
                            this.setState({lastChanged: ''});
                            this.timerChanged = null;
                        }, 30000);
                    }

                    return this.props.socket.setObject(id, obj);
                })
                .then(() => {
                    // update obj
                    this.informInstance(id);
                })
                .catch(err => this.props.onError(err));
        });
    }

    
    onGHParamsChange(newData, oldData) {
        this.addChanged(newData.id, () => {
            this.props.socket.getObject(newData.id)
                .then(obj => {
                  //  id, newData.type, newData.displayTraits, newData.displayAttributes
                    Utils.updateSmartName(obj, this.editedSmartName, undefined, undefined, this.props.adapterName + '.' + this.props.instance, this.props.native.noCommon);
                    if (JSON.stringify(newData.displayTraits) !== JSON.stringify(oldData.displayTraits)) {
                        if (!Array.isArray(newData.displayTraits)) {
                            newData.displayTraits=[newData.displayTraits]
                        }

                        obj.common.smartName.ghTraits = newData.displayTraits;
                    }
                    if (newData.type !== oldData.type) {
                        obj.common.smartName.ghType = newData.type;
                    }
                    if (newData.displayAttributes !== oldData.displayAttributes ) {
                        obj.common.smartName.ghAttributes = newData.displayAttributes
                        try {
                            if(obj.common.smartName.ghAttributes) {
                            JSON.parse(obj.common.smartName.ghAttributes)
                        }
                        } catch (error) {
                            this.setState({message: I18n.t('Attributes has not correct JSON format.')})
                        }
                    }
                    if (newData.conv2GH) {
                        obj.common.smartName.ghConv2GH = newData.displayConv2GH;
                    }
                    if (newData.conv2iob) {
                        obj.common.smartName.ghConv2iob = newData.displayConv2iob;
                    }
                    return this.props.socket.setObject(newData.id, obj);
                })
                .then(() => {
                    // update obj
                    this.informInstance(newData.id);
                })
                .catch(err => this.props.onError(err));
        });
    }
   

    renderMessage() {
        if (this.state.message) {
            return (<MessageDialog text={this.state.message} onClose={() => this.setState({message: ''})}/>);
        } else {
            return null;
        }
    }

    changeSmartName(e) {
        e && e.preventDefault();
        // Check if the name is duplicate
        this.addChanged(this.state.editId, () => {
            const id = this.state.editId;
            this.setState({editId: '', editObjectName: '', lastChanged: id});

            this.timerChanged && clearTimeout(this.timerChanged);
            this.timerChanged = setTimeout(() => {
                this.setState({lastChanged: ''});
                this.timerChanged = null;
            }, 30000);

            this.props.socket.getObject(id)
                .then(obj => {
                    Utils.updateSmartName(obj, this.editedSmartName, undefined, undefined, this.props.adapterName + '.' + this.props.instance, this.props.native.noCommon);
                    return this.props.socket.setObject(id, obj);
                })
                .then(() => {
                    // update obj
                    this.informInstance(id);
                })
                .catch(err => this.props.onError(err));
        });
    }

    getSelectIdDialog() {
        if (this.state.showSelectId) {
            return (<DialogSelectID
                key="dialogSelectID1"
                prefix={'../..'}
                connection={this.props.socket}
                selected={''}
                statesOnly={true}
                onClose={() => this.setState({showSelectId: false})}
                onOk={(selected) => {
                    this.setState({showSelectId: false});

                    this.props.socket.getObject(selected)
                        .then(obj => {
                            if (obj) {
                                const name = Utils.getObjectNameFromObj(obj, null, {language: I18n.getLanguage()});
                                Utils.updateSmartName(obj, (name || I18n.t('Device name')).replace(/[-_.]+/g, ' '), undefined, undefined, this.props.adapterName + '.' + this.props.instance, this.props.native.noCommon);
                                this.addChanged(obj._id);
                                this.waitForUpdateID = obj._id;

                                if (this.state.lastChanged !== obj._id) {
                                    this.setState({lastChanged: obj._id});
                                    this.timerChanged && clearTimeout(this.timerChanged);
                                    this.timerChanged = setTimeout(() => {
                                        this.setState({lastChanged: ''});
                                        this.timerChanged = null;
                                    }, 30000);
                                }
                                
                                if (!obj.common.smartName) {

                                    obj.common.smartName = {ghType:"action.devices.types.LIGHT"}
                                    obj.common.smartName = {ghTraits:["action.devices.traits.OnOff"]}
                                } else {

                                    obj.common.smartName.ghType="action.devices.types.LIGHT"
                                    obj.common.smartName.ghTraits=["action.devices.traits.OnOff"];
                                }
                                
                                this.props.socket.setObject(obj._id, obj)
                                    .then(() => {
                                        this.informInstance(obj._id);
                                        this.setState({message: I18n.t('Please add type and trait to complete the Google Home state.')});})
                                    .catch(err => this.setState({message: err}));
                            } else {
                                this.setState({message: I18n.t('Invalid ID')});
                            }
                        });
                }}
            />);
        } else {
            return null;
        }
    }

    

    render() {
        if (this.state.loading) {
            return (<CircularProgress  key="alexaProgress" />);
        }

        return (
            <form key="gh" className={this.props.classes.tab}>
                <Fab size="small" color="secondary" aria-label="Add" className={this.props.classes.button} onClick={() => this.setState({showSelectId: true})}><IconAdd /></Fab>
                <Fab 
                style ={{marginLeft:"1rem"}} size="small" color="primary" aria-label="Refresh" className={this.props.classes.button}
                      onClick={() => this.browse(true)} disabled={this.state.browse}>{this.state.browse ? (<CircularProgress size={20} />) : (<IconRefresh/>)}</Fab>

            
                {this.renderMessage()}
                {this.getSelectIdDialog()}
                <div style={{marginTop:"4rem",display: "flex"}}>
                <div style={{ flex: "50%"}}><div style={{fontWeight:"bold"}}> Auto Mode</div>
                <div style={{marginTop:"0.8rem",marginRight:"0.8rem",}}>{I18n.t('To auto detect devices please assign a room and function to the channel if no channel available than assign to a device. Not only to the state or device. And enable them under SmartEnum/Intelligente Aufzählung')}</div>
              
                </div>
                <div style={{ flex: "50%"}}><div style={{fontWeight:"bold"}}>Manuell Mode</div>
                <span>{Utils.renderTextWithA(I18n.t("Please select a  <a target='_blank' rel='noopener noreferrer' href='https://developers.google.com/actions/smarthome/guides/'>TYPE</a> and a"))}</span>
                <span>{Utils.renderTextWithA(I18n.t("<a target='_blank' rel='noopener noreferrer' href='https://developers.google.com/actions/smarthome/traits/' > TRAIT</a> after adding a state.   To add multiple traits add a different id and trait but same smartname, type and room. Comma separated for mutiple smartnames.  To assign a room please use the ioBroker Enums/Aufzählungen.  With attributes you can for example set a range for the color temperature "))}</span>
                <span>  {Utils.renderTextWithA(I18n.t("<a target='_blank' rel='noopener noreferrer' href='https://developers.google.com/actions/smarthome/traits/colorsetting'> Infos about Attributes you can find here.</a> Empty attribute is {}"))}</span>
                </div>

                </div>
                <br></br>
                <div style={{ flex: "100%"}}><div style={{fontWeight:"bold"}}>{Utils.renderTextWithA(I18n.t("For help use this forum <a target='_blank' rel='noopener noreferrer' href='https://forum.iobroker.net/topic/24061/google-home-assistant-iobroker-einrichten-nutzen/'>thread</a>"))}</div></div>
             
                
                <div>
                <MaterialTable
                style ={{marginTop:"1rem",display: "inline-block"}}
                title=""
                tableRef={this.myTableRef}
                onRowClick={(e, rowData) => {
                    this.myTableRef.current.onTreeExpandChanged(rowData.tableData.path, rowData)
                }
            }
           
                columns={this.state.columns}
                parentChildData={(row, rows) => {
                    const result = rows.find(function(element) {
                        if (element.id && row.parentId && element.id === row.parentId) {
                            console.log(row.parentId)
                            return true;
                        };
                      })
                      console.log(result)
                      return result
                }} 
                data={this.state.devices}
                icons={tableIcons}
                isLoading={this.state.browse }
                options={{
                    actionsColumnIndex: -1,
                    paging: false, 
                    rowStyle: (rowData) => {
                        let background = '#FFF'
                        if (rowData.smartEnum) {
                            background = '#F7FFEA'
                        }
                        if (rowData.ioType === "channel" || rowData.ioType === "device") {
                            if (rowData.smartEnum) {
                                background = '#eafff2'
                            } else {
                                background = '#E2FFFF'
                            }
                            
                        }
                        if  (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) {
                            background =  '#EEE'
                        }


                        return {backgroundColor:  background}
                      }
                  }}
               
                editable={{
                    
                    onRowUpdate: (newData, oldData) => {
                        if (newData.name.nicknames && Array.isArray(newData.name.nicknames)) {
                            newData.name.nicknames = newData.name.nicknames.join(",");
                        }
                        this.editedSmartName = newData.name.nicknames
                        this.setState({editId: newData.id});
                       
                    return new Promise(resolve => {
                        this.setState({browse:true})
                        setTimeout(() => {
                            if(!newData.type || !newData.displayTraits) {
                                this.setState({message: I18n.t('Please add action and trait to complete the Google Home state.')});
                            }
                        
                        this.onGHParamsChange(newData, oldData);
                        resolve();
                        const devices = [...this.state.devices];
                        devices[devices.indexOf(oldData)] = newData;
                        this.setState({ ...this.state, devices });
                        }, 500);
                    })},
                    onRowDelete: (oldData) => {
                    // if smartenum set smartname on false if not delete/reset smartname content
                    if (oldData.smartEnum=== "X") {
                        this.setState({deleteId: oldData.id});
                    } else {
                        this.props.socket.getObject(oldData.id)
                        .then(obj => {
                            if (obj.common["smartName"]) {
                                delete obj.common["smartName"]["ghTraits"]
                                delete obj.common["smartName"]["ghType"]
                                delete obj.common["smartName"]["ghAttributes"]
                            }
                            
                            return this.props.socket.setObject(oldData.id, obj);
                        })
                    }
                    return new Promise(resolve => {
                        setTimeout(() => {
                            if (this.state.deleteId) {
                                this.onDelete();
                            } else {

                            this.informInstance(oldData.id);
                            }
                            resolve();
                            const devices = [...this.state.devices];
                            devices.splice(devices.indexOf(oldData), 1);
                            this.setState({ ...this.state, devices });
                        }, 600);
                    })
                    }
                }}
                /></div>

            </form>
        );
    }
}

GoogleSmartNames.propTypes = {
    common: PropTypes.object.isRequired,
    native: PropTypes.object.isRequired,
    instance: PropTypes.number.isRequired,
    adapterName: PropTypes.string.isRequired,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onChange: PropTypes.func,
    socket: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoogleSmartNames);
