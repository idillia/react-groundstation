import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class LGU extends Component {
	constructor(props) {
		super(props)
        this.state = {
            lift: [
                {
                    fwd1: {
                        direction: {
                            up: false, down: true
                        },
                        speed: {
                            low: 0, high: 10000, value: 0
                        }
                    }
                },
                {
                    fwd2: {
                        direction: {
                            up: false, down: true
                        },
                        speed: {
                            low: 0, high: 10000, value: 0
                        }
                    }
                },
                {
                    aft1: {
                        direction: {
                            up: false, down: true
                        },
                        speed: {
                            low: 0, high: 10000, value: 0
                        }
                    }
                },
                {
                    aft2: {
                        direction: {
                            up: false, down: true
                        },
                        speed: {
                            low: 0, high: 10000, value: 0
                        }
                    }
                }
            ]
        }
	}

	componentDidMount() {
        var _this = this;
	}
    

	handleSpeedChange(e, index) {
        var _index = e;// not quite sure what's happening here
        var _e = index;// not quite sure what's happening here
        
        //set name of lift and value returned to variables
        var liftName = _e.currentTarget.name;
        var liftSpeed = _e.currentTarget.value;

        //assign object to variable
        var _speed = this.state.lift[_index][liftName].speed;
        
        //set value on object item
        var val = _speed.value = liftSpeed;

        //set state
        this.setState({_speed: _speed});
        
        //send name of LGU and new value set
		socket.emit('lgu:speedChange', {liftName: liftName, liftSpeed: liftSpeed})
	}

	handlePositionChange(e, index) {
        var _index = e;// not quite sure what's happening here
        var _e = index;// not quite sure what's happening here

        //set name of lift and value returned to variables
        var liftName = _e.currentTarget.name;
        var liftDirection = _e.currentTarget.value;

        //assign object to variable
        var _direction = this.state.lift[_index][liftName].direction;

        //set value on object items
        var upVal = _direction.up = false;
        var downVal = _direction.down = true;
        
        //set values if position is up
        if(liftDirection === 'up')
        {
            upVal = _direction.up = true;
            downVal = _direction.down = false;
        }
        
        //set state object
        this.setState({_direction: _direction})
        
        //send name of LGU and new values to server
		socket.emit('lgu:positionChange', {liftName: liftName, liftDirection: liftDirection})
	}

	render() {
        var _this = this;
	    return (
		    	<div className="Overview-content">
                    {
                        this.state.lift.map(function(item, index){
                        var itemName = Object.keys(item),
                            speedkey = Object.keys(item[itemName])[1],
                            speedLow = item[itemName].speed.low,
                            speedHigh = item[itemName].speed.high,
                            speedVal = item[itemName].speed.value,
                            directionkey = Object.keys(item[itemName])[0],
                            direction = Object.keys(item[itemName].direction),
                            upKey = direction[0],
                            upVal = item[itemName].direction.up,
                            downKey = direction[1],
                            downVal = item[itemName].direction.down;

                                    return (<form key={index}>
                                        <fieldset>
                                            <legend>{itemName}</legend>
                                            <div className="form-group">
                                                <label htmlFor={itemName + '-' + speedkey}>{speedkey}</label>
                                                <input type="range" name={itemName} id={itemName + '-' + speedkey} onChange={_this.handleSpeedChange.bind(_this, index)} value={speedVal} min={speedLow} max={speedHigh} />
                                            </div>

                                            <div className="form-group">
                                                <label>{directionkey}</label>
                                                <br />
                                                <input type="radio" id={itemName + '-' + upKey} name={itemName} onChange={_this.handlePositionChange.bind(_this, index)} checked={upVal ? 'checked' : ''} value={upKey} />
                                                <label htmlFor={itemName + '-' + upKey}>{upKey}</label>
                                                <br />
                                                <input type="radio" id={itemName + '-' + downKey} name={itemName} onChange={_this.handlePositionChange.bind(_this, index)} checked={downVal ? 'checked' : ''} value={downKey} />
                                                <label htmlFor={itemName + '-' + downKey}>{downKey}</label>
                                            </div>
                                        </fieldset>
                                    </form>);
                    })}
				</div>
	    );
	}
}

export default LGU;




// WEBPACK FOOTER //
// ./src/components/LGU.js


// WEBPACK FOOTER //
// ./src/components/LGU.js


// WEBPACK FOOTER //
// ./src/components/LGU.js