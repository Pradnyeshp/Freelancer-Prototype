import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <form>
                    <label>Name :
                        <input type="text" ref="name" required />
                    </label>
                    <label>Email :
                        <input type="text" ref="email" required />
                    </label>
                    <label>Phone Number :
                        <input type="text" ref="phone" required />
                    </label>
                    <label>About Me :
                        <input type="text" ref="aboutme" required />
                    </label>
                    <label>Skills :
                        <input type="text" ref="email" required />
                    </label>
                    <label>Profile Image :
                        <input type="text" ref="email" required />
                    </label>
                    <button>Edit</button>
                </form>
            </div>
        );
    }
}

export default Profile;
