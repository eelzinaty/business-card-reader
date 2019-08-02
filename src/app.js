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

const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');

MutationButton.addEventListener('click', (evt) => {
  MutationResult.innerHTML = `MUTATION RESULTS:`;
});