import React from "react";

/**
 * Renders information obtained from Spring Boot
 * @param props 
 */
export const SpringBootData = (props) => {
    return (
        <div id="profile-div">
            <p><strong>Spring Boot Data: </strong> {props.springBootData}</p>
        </div>
    );
};
