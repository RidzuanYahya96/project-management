"use client";

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        },
    },
})

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: "Enter your username",
            label: "Username",
            isRequired: true,
        },
        email: {
            order: 2,
            placeholder: "Enter your email address",
            label: "Email",
            isRequired: true,
            type: "email",
        },
        password: {
            order: 3,
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true,
            type: "password",
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            isRequired: true,
            type: "password",
        },
    },
};

//const AuthProvider = ({ children }: any) => {
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mt-5">
            <Authenticator formFields={formFields}>
                {({ user }) =>
                    user ? (
                        <div>{children}</div>
                    ) : (
                        <div>
                            <h1>Please sign in</h1>
                        </div>
                    )
                }
            </Authenticator>
        </div>
    )
}

export default AuthProvider;
