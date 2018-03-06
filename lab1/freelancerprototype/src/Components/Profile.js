import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <form>
                    <label>Name :
                        <input type="text" ref="name"  />
                    </label><br/>
                    <label>Email :
                        <input type="text" ref="email"  />
                    </label><br />
                    <label>Phone Number :
                        <input type="text" ref="phone"  />
                    </label><br />
                    <label>About Me :
                        <input type="text" ref="aboutme"  />
                    </label><br />
                    <label>Skills :
                        <input type="text" ref="email"  />
                    </label><br />
                    <label>Profile Image :
                        <input type="text" ref="email"  />
                    </label><br />
                    <button>Edit</button>
                    <Link to='/' className='btn btn-danger'>LogOut</Link>
                </form>
            </div>
        );
    }
}

export default Profile;
