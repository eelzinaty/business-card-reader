import Amplify from '@aws-amplify/core';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Storage from '@aws-amplify/storage'
import Auth from '@aws-amplify/auth'
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const ResultUpdates = document.getElementById('ResultUpdates');
const UploadImageForm = document.getElementById('UploadImageForm');

UploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    ResultUpdates.innerHTML = `Uploading file, wait ...`;
    let photo = document.getElementById("fileToUpload").files[0];
    
    Storage.put('test.jpg', photo,
        {
            level: 'public'
        }
    ).then(data => {
        ResultUpdates.innerHTML = `File uploaded successfully. Wait till the extracted text result come back.`;
        console.log(data);
        Predictions.identify({
            text: {
                source: {
                    key: data.key,
                    level: 'public'
                }
            }
        }).then((response) => {
            console.log(response)
            ResultUpdates.innerHTML = `Text Extracted Successfully`;
            ResultUpdates.innerHTML += `<br/>Result line by line:<br/>`;
            ResultUpdates.innerHTML += `${response.text.lines.join('<br/>')}`;
        }).catch(error => {
            ResultUpdates.innerHTML = `Failed to extract the information!`;
            console.log(error);
        });
    })
    .catch(error => {
        ResultUpdates.innerHTML = `Failed to upload the file`;
        console.log(error);
    });
    
});