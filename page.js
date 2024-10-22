import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAVkI1GLqQhQFZI_oTUyqaBQ8YJAIbOD5s",
        authDomain: "study-buddy-pl-2024.firebaseapp.com",
        projectId: "study-buddy-pl-2024",
        storageBucket: "study-buddy-pl-2024.appspot.com",
        messagingSenderId: "1089430537555",
        appId: "1:1089430537555:web:770cc815c7c73c626f4da6",
        measurementId: "G-6XJ2NWZBJ5"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const storage = getStorage(app);
    const mediaGallery = document.getElementById('media-gallery');

    if (mediaGallery) {
        const mediaFolderRef = ref(storage, 'page1/');

        listAll(mediaFolderRef).then((result) => {
            result.items.forEach((mediaRef) => {
                getDownloadURL(mediaRef).then((url) => {
                    const fileName = mediaRef.name.toLowerCase();
                    if (fileName.endsWith('.mp4') || fileName.endsWith('.avi')) {
                        const videoElement = document.createElement('video');
                        videoElement.src = url;
                        videoElement.controls = true;
                        videoElement.width = 640;
                        videoElement.height = 360;
                        mediaGallery.appendChild(videoElement);
                    } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
                        const imageElement = document.createElement('img');
                        imageElement.src = url;
                        imageElement.alt = fileName;
                        mediaGallery.appendChild(imageElement);
                    }
                }).catch((error) => {
                    console.error("Error getting media URL:", error);
                });
            });
        }).catch((error) => {
            console.error("Error listing media:", error);
        });
    } else {
        console.error("Element with ID 'media-gallery' not found.");
    }
});