import React, { useState } from 'react';

import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { callSpringBoot } from './springboot';
import { ProfileData } from './components/ProfileData';
import { SpringBootData } from './components/SpringBootData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import Button from 'react-bootstrap/Button';

/**
 * Renders welcome message for the signed-in user or a button to retrieve welcome message from Spring Boot app
 */

const SpringBootContent = () => {
    const { instance, accounts } = useMsal();
    const [springBootData, setSpringBootData] = useState(null);
    function RequestSpringBootData() {
        // Silently acquire an access token which is then attached to a request for Spring Boot Content
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                // the access token currently comes with the Graph audience, which Spring Boot does not like
                // we use ID token here as it has with the proper audience which Spring Boot will accept
                // to get more granular with delegated permissions and/or app roles will just require separate client and API apps
                callSpringBoot(response.idToken).then((response) => setSpringBootData(response));
            });
    }
    return (
        <>
            <h5 className="profileContent">Spring Boot Data for {accounts[0].name}</h5>
            {springBootData ? (
                <SpringBootData springBootData={springBootData} />
            ) : (
                <Button variant="secondary" onClick={RequestSpringBootData}>
                    Request Spring Boot Data
                </Button>
            )}
        </>
    );
};

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }

    return (
        <>
            <h5 className="profileContent">Graph Profile for {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile
                </Button>
            )}
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <SpringBootContent />
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
