# EduFlix

EduFlix is an online service for students and educators that allows for small scale collaboration in a space condusive to learning.

In the current world students are limited by their options to receive educational material as we operate in this "New Normal". Too often students either have to watch pre-recorded snippets on their own or are forced into large live Zoom calls that allow for little to no-interaction and a tendency not to ask questions due to social pressure.

## Our Solution

Here we provide a tool to allow educators or students to upload video content. This can then be viewed as a group in a fashion similar to a "Netflix Party". Students can pause and play as they like wit synchronous playback. They can speak freely among friends and engage with the content. Optionally lectures with the premium setup can add interactive elements to their videos. This will work much better than in a live zoom call as students will feel happier to discuss and respond to questions amongst their peers and without the eyes and ears of the educator upon them.

## Tech Tree

We implement a Python backend and user interface with JavaScript for this app. We will use AWS storage for video upload and retrieval.

To get the flask server running follow the following commands after cloning:

```
pip install -r requirements.txt
export FLASK_APP=EduFlixApp
export FLASK_ENV=development
flask run
```
