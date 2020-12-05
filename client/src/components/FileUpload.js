import React, {Fragment, useState} from 'react'
import LinearProgess from "../components/LinearProgess"
const axios = require('axios');

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose file....');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const onChange = (e) => {
        console.log(e.target.files.length);
        if(e.target.files.length > 0){
            setFile(e.target.files[0])
            setFilename(e.target.files[0].name)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file)
        formData.append('name', "aditya")
        formData.append('tags', JSON.stringify(['asdcdc', 'cdcd']))
        try{
            console.log('making req....')
            const res = await axios.post('/upload', formData, {
                onUploadProgress: progressEvent => {
                    const percentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                    setUploadPercentage(percentage)

                    if(percentage === 100){
                        setTimeout(() => {setUploadPercentage(0); setIsUploading(false)}, 2000);    
                    }
                }
            })
            console.log(res);
            setUploadedFile(res.data);
        }catch (err) {
            if(err.response.status === 500){
                console.log('Internal server err')
            }else{
                console.log(err.response.data.msg)
            }
        }
    }
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>
            <br/>
            <LinearProgess progress={uploadPercentage}/>
            {file && isUploading ?  <LinearProgess progress={uploadPercentage}/> : null}
        </Fragment>
    )
}

export default FileUpload
