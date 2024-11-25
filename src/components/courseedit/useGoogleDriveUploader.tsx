import { useEffect, useState } from "react";

declare global {
   interface Window {
      gapi: any;
      google: any;
   }
}

const CLIENT_ID =
   "836431629106-cvkrjbo886n1bd6om14fpt8f7hnsog54.apps.googleusercontent.com";
const API_KEY = "AIzaSyBJn3IUIvGPxvfgYTbbeuCKNwYn4GBwmOg";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const DISCOVERY_DOC =
   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

let tokenClient: any;
export const useGoogleDriveUploader = () => {
   const [gapiReady, setGapiReady] = useState(false);
   const [gisReady, setGisReady] = useState(false);

   useEffect(() => {
      // Initialize the Google API client
      const initializeGapiClient = async () => {
         await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
         });
         setGapiReady(true);
      };

      // Load the GAPI client and OAuth2
      const gapiLoaded = () => {
         window.gapi.load("client", initializeGapiClient);
      };

      const gisLoaded = () => {
         tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: "", // Defined later
         });
         setGisReady(true);
      };

      // Load GAPI script and initialize it
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = gapiLoaded;
      document.body.appendChild(script);

      // Load Google Identity Services script
      const gisScript = document.createElement("script");
      gisScript.src = "https://accounts.google.com/gsi/client";
      gisScript.onload = gisLoaded;
      document.body.appendChild(gisScript);
   }, []);

   const uploadVideoToGoogleDrive = async (file: File) => {
      if (!file) {
         console.error("No file to upload.");
         return;
      }

      if (!gapiReady || !gisReady) {
         console.error("GAPI or GIS is not ready.");
         return;
      }

      const uploadFile = async (accessToken: string) => {
         const metadata = {
            name: new Date().toISOString(),
            mimeType: file.type,
            parents: ["1f2UKA5aP6JimNpWYdXOk1oLt0QMNsm6U"], // Folder ID
         };

         const form = new FormData();
         form.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" }),
         );
         form.append("file", file);

         const xhr = new XMLHttpRequest();
         xhr.open(
            "POST",
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
         );
         xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
         xhr.responseType = "json";

         xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
               const percentCompleted = Math.round(
                  (event.loaded / event.total) * 100,
               );
               console.log(`Upload progress: ${percentCompleted}%`);
            }
         };

         xhr.onload = () => {
            if (xhr.status === 200) {
               console.log(
                  "File uploaded successfully. File ID:",
                  xhr.response.id,
               );
            } else {
               console.error("Failed to upload the file.");
            }
         };

         xhr.onerror = () => {
            console.error("Upload failed.");
         };

         xhr.send(form);
      };

      // Check for an existing access token in localStorage
      const storedToken = localStorage.getItem("googleAccessToken");
      if (storedToken) {
         // Check if the token is expired
         const tokenExpiration = localStorage.getItem(
            "googleAccessTokenExpiration",
         );
         if (
            tokenExpiration &&
            new Date().getTime() < parseInt(tokenExpiration)
         ) {
            await uploadFile(storedToken);
            return;
         }
      }

      // Define token client callback for requesting a new token
      tokenClient.callback = async (resp: any) => {
         if (resp.error !== undefined) {
            console.error("Error while requesting token:", resp);
            return;
         }
         const accessToken = window.gapi.auth.getToken().access_token;

         // Save the access token and expiration time to localStorage
         localStorage.setItem("googleAccessToken", accessToken);
         const expiresIn = 3600 * 1000; // 1 hour in milliseconds
         const expirationTime = new Date().getTime() + expiresIn;
         localStorage.setItem(
            "googleAccessTokenExpiration",
            expirationTime.toString(),
         );

         await uploadFile(accessToken);
      };

      // Request access token, user interaction is required
      tokenClient.requestAccessToken({ prompt: "consent" });
   };

   return { uploadVideoToGoogleDrive };
};
