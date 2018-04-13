import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import url from '../serverurl';
//import image from '../images/freelancerlogo.png';

class Imageuploader extends Component {
    constructor() {
        super();
        this.state = {
            fileSelected: '',
            imagePreview: '',
            display: 'none',
            filename: 'default.png'
        }
    }

    componentWillMount(){

        this.loadUserImage();

    }

    loadUserImage(){

        var self = this;
        axios.get( url + "/getuserimage?username=" + localStorage.getItem('username'), {withCredentials: true} )
            .then( (response) => {
                console.log('In imageupload', response.data);
                self.setState({
                    filename: response.data.image_name.image_name
                })
            })
    }

    handleChange = e => {
        e.preventDefault();
        console.log("In handle Change", e.target.files[0].name);
        var rdr = new FileReader();
        var fileSelected = e.target.files[0];
        rdr.onloadend = () => {
            this.setState({
                // fileSelected: fileSelected,
                // imagePreview: rdr.result,
                display: 'block',
                fileSelected: fileSelected
            });
        }

        rdr.readAsDataURL(fileSelected);
    }

    handleUplaod = (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append('filevalue', this.state.fileSelected);
        form_data.append('username', localStorage.getItem('username'));
        console.log(form_data);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        if(this.state.fileSelected !== ""){
            var self =this;
            axios.post(url + '/saveimage', form_data, { withCredentials: true}, config)
                .then( (response) => {
                    self.setState({
                        filename: "" + localStorage.getItem('username') + "." + response.data.fileType

                    })
                })
        }
        else{
            alert("Please upload an image first");
        }
        // console.log("In handle upload...")
        // console.log("In mapDispatch",  this.state.fileSelected + "......" + this.state.imagePreview);
        // const imageDetails = {
        //     fileSelected: this.state.fileSelected,
        //     imagePreview: this.state.imagePreview
        // }
        // axios.post('http://localhost:3001/saveimage', imageDetails, { withCredentials: true})
        // .then( (response) => {

        // })
    }


    render() {

        // let {imagePreview} = this.state;
        let $imagePreviewFinal = null;
        if (this.state.filename) {

            // $imagePreviewFinal = (<img src = { require('/Users/venkateshdevale/Desktop/private git/cmpe273/lab2/Freelancer/freelancer-server/images/' + this.state.filename) } alt = "This is user's display pic"/>);
            $imagePreviewFinal = (<img src = { require('E:/CMPE273/lab2/freelancerServer/public/' + this.state.filename) } alt = "This is display pic"/>);
        }
        const style = {
            display : this.state.display
        }
        return(
            <div className="Imageuploader">
                <div id='profileImage'>
                    {$imagePreviewFinal}
                    <div id='imageUploader'>
                        <input type='file' className='fileInput' onChange={this.handleChange.bind(this)} />
                        <button style = {style} onClick = {this.handleUplaod.bind(this)} className="btn btn-primary"><label>Upload</label></button>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        saveImage : (image) => {
            //console.log("In mapDispatch" + imageDetails + "......" + imageName);
            axios.post(url + '/saveImage', image)
                .then( (response) => {
                    if(response.data.message === 'Image Uploaded')
                        alert(response.data.message);
                    else
                        alert('Error in updating image...try again later');
                })
        }
    }
}

export default connect(null, mapDispatchToProps)(Imageuploader);
