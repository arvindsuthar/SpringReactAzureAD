import React from "react";

/**
 * Renders information obtained from Spring Boot
 * @param props 
 */
export const SpringBootData = (props) => {
    return (
        <div id="profile-div">
            <p><strong>Greeting: </strong> {props.springBootRole}</p>
            <p><strong>Roles in the Token: </strong> {props.springBootAuthorities}</p>
        </div>
    );
};
