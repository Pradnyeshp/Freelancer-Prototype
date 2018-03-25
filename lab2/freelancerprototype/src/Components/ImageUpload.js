import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import image from '../images/freelancerlogo.png';

class Imageuploader extends Component {
    constructor() {
        super();
        this.state = {
            fileSelected: '',
            imagePreview: '',
            display: 'none'
        }
    }

    handleChange = e => {
        e.preventDefault();
        console.log("bhdib", e.target.files[0].name);
        let rdr = new FileReader();
        let fileSelected = e.target.files[0];
        rdr.onloadend = () => {
            this.setState({
                fileSelected: fileSelected,
                imagePreview: rdr.result,
                display: 'block'
            });
        }

        rdr.readAsDataURL(fileSelected);
    }

    handleUplaod = () => {
        console.log("In handle upload...")
        console.log("In mapDispatch" + this.state.fileSelected + "......" + this.state.imagePreview);
    }


    render() {
        let { imagePreview } = this.state;
        let $imagePreviewFinal = null;
        if (imagePreview) {
            $imagePreviewFinal = (<img src={imagePreview} alt="This is user's display pic" />);
        }
        const style = {
            display: this.state.display
        }
        return (
            <div className="Imageuploader">
                <div id='profileImage'>
                    {$imagePreviewFinal}
                    <div id='imageUploader'>
                        <input type='file' className='fileInput' onChange={this.handleChange} />
                        <button style={style} onClick={this.handleUplaod} className="btn btn-primary"><label>Upload</label></button>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        saveImage: (image) => {
            //console.log("In mapDispatch" + imageDetails + "......" + imageName);
            axios.post('http://localhost:3001/saveImage', image)
                .then((response) => {

                })
        }
    }
}

export default connect(null, mapDispatchToProps)(Imageuploader);
