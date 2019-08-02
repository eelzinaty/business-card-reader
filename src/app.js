import Amplify from '@aws-amplify/core';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Storage from '@aws-amplify/storage'
import Auth from '@aws-amplify/auth'
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

async function createNewTodo() {
    console.log("In")
}

//const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');
const UploadImageForm = document.getElementById('UploadImageForm');

UploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let photo = document.getElementById("fileToUpload").files[0];
    let formData = new FormData();

    formData.append("photo", photo);
    Storage.put('test.jpg', photo,
        {
            level: 'public'
        }
    ).then(data => {
        console.log(data);
        Predictions.identify({
            text: {
                source: {
                    key: data.key,
                    level: 'public'
                }
            }
        }).then((response) => {
            MutationResult.innerHTML = `MUTATION RESULTS:` + JSON.stringify(response);
        });
    })
    .catch(error => {
        console.log(error);
    });
    
});